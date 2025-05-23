'use client';
import { useMemo, useState } from 'react';
import { Flex, Separator } from '@chakra-ui/react';
import { PeopleList } from '@/app/messages/_components/PeopleList';
import { ChatConversation } from '@/app/messages/_components/ChatConversation';
import { AggregatedConversation } from '@/app/lib/types';

export const Chat = ({ messages, userId, userName, userGlobalName, userAvatar }: {
    messages: AggregatedConversation[];
    userId: string;
    userName: string;
    userGlobalName: string | null;
    userAvatar: string;
}) => {
    const [activeConversation, setActiveConversation] = useState<string | null>(
        null,
    );

    const people = useMemo(() => {
        const people = new Map<
            string,
            { id: string; name: string; globalName: string | null; avatar: string; unread: number }
        >();

        for (const message of messages) {
            if (people.has(message.user_id)) {
                const person = people.get(message.user_id)!;
                people.set(message.user_id, {
                    id: person.id,
                    name: person.name,
                    globalName: person.globalName,
                    avatar: person.avatar,
                    unread: person.unread + 1,
                });
            } else {
                people.set(message.user_id, {
                    id: message.user_id,
                    name: message.user_name,
                    globalName: message.user_global_name,
                    avatar: message.user_avatar,
                    unread: 1,
                });
            }
        }

        return Array.from(people.values());
    }, [messages]);

    return (
        <Flex w="100%" h="100%" direction="row" pt={8}>
            <PeopleList
                people={people}
                setActiveConversation={setActiveConversation}
            />
            <Separator orientation="vertical"/>
            <ChatConversation
                person={people.find((p) => p.id === activeConversation)}
                userId={userId}
                userName={userName}
                userGlobalName={userGlobalName}
                userAvatar={userAvatar}
                messages={
                    messages.find((m) => m.user_id === activeConversation)
                        ?.messages || []
                }
            />
        </Flex>
    );
};
