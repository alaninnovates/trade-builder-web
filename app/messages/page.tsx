import { Flex, Separator } from '@chakra-ui/react';
import { PeopleList } from '@/app/messages/_components/PeopleList';
import { ChatConversation } from '@/app/messages/_components/ChatConversation';

const Page = () => {
    return (
        <Flex w="100%" h="100%" direction="row" pt={8}>
            <PeopleList />
            <Separator orientation="vertical" />
            <ChatConversation />
        </Flex>
    );
};

export default Page;
