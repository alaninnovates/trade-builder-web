import { Flex, Separator } from '@chakra-ui/react';
import { PeopleList } from '@/app/messages/_components/PeopleList';
import { ChatConversation } from '@/app/messages/_components/ChatConversation';
import client from '@/app/lib/db';
import { ChatMessage } from '@/app/lib/types';
import { auth } from '@/app/lib/auth';

const Page = async () => {
    const messages = await getMessages();

    if (!messages) {
        return null;
    }

    console.log(messages);

    return (
        <Flex w="100%" h="100%" direction="row" pt={8}>
            <PeopleList/>
            <Separator orientation="vertical"/>
            <ChatConversation/>
        </Flex>
    );
};

export default Page;

const getMessages = async () => {
    const session = await auth();

    if (!session || !session.user) return undefined;
    const userId = session.user.id!;

    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const messages = db.collection<ChatMessage>('messages');
        return messages.aggregate([{
            $or: [
                {
                    target: {
                        user_id: userId,
                    },
                },
                {
                    source: {
                        user_id: userId,
                    },
                },
            ],
        }, {
            $sort: {
                created_at: -1,
            },
        }, {
            $group: {
                _id: {
                    $cond: {
                        if: {
                            $eq: ['$source.user_id', userId],
                        },
                        then: '$target.user_id',
                        else: '$source.user_id',
                    },
                },
                lastMessage: {
                    $first: '$$ROOT',
                },
            },
        }, {
            $replaceRoot: {
                newRoot: '$lastMessage',
            },
        }]).toArray();
    } catch (e) {
        console.error(e);
    }
};
