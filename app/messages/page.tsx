import { Flex, Separator } from '@chakra-ui/react';
import { PeopleList } from '@/app/messages/_components/PeopleList';
import { ChatConversation } from '@/app/messages/_components/ChatConversation';
import { getMessages } from '@/app/lib/messaging';
import { useMemo, useState } from 'react';

const Page = async () => {
    const messages = await getMessages();

    if (!messages) {
        return null;
    }

    console.log(messages);

    const [activeConversation, setActiveConversation] = useState<string | null>(null);

    const people = useMemo(() => {
        const people = new Map<string, { name: string, unread: number }>();

        messages.forEach((message) => {
            people.set(message.target.user_id, {
                name: message.target.user_name,
                unread: 0,
            });
        });

        return Array.from(people.values());
    }, [messages]);

    return (
        <Flex w="100%" h="100%" direction="row" pt={8}>
            <PeopleList people={people} setActiveConversation={setActiveConversation}/>
            <Separator orientation="vertical"/>
            <ChatConversation />
        </Flex>
    );
};

export default Page;
