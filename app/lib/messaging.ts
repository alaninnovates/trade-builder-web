'use server';
import { AggregatedConversation, ChatMessage, Trade as TradeType } from '@/app/lib/types';
import { auth } from '@/app/lib/auth';
import client from '@/app/lib/db';

interface User {
    user_id: string;
    user_name: string;
    user_avatar: string;
}

export const sendTradeOffer = async (targetUser: User, trade: TradeType) => {
    const authUser = await auth();

    if (!authUser || !authUser.user) {
        return;
    }

    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const messages = db.collection<Omit<ChatMessage, '_id'>>('messages');
        return await messages.insertOne({
            target: targetUser,
            source: {
                user_id: authUser.user.id!,
                user_name: authUser.user.name!,
                user_avatar: authUser.user.image!,
            },
            message: '',
            trade,
            created_at: new Date(),
        });
    } catch (e) {
        console.error(e);
    }
};

export const sendMessage = async (targetUser: User, message: string) => {
    const authUser = await auth();

    if (!authUser || !authUser.user) {
        return;
    }

    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const messages = db.collection<Omit<ChatMessage, '_id'>>('messages');
        return await messages.insertOne({
            target: targetUser,
            source: {
                user_id: authUser.user.id!,
                user_name: authUser.user.name!,
                user_avatar: authUser.user.image!,
            },
            message,
            created_at: new Date(),
        });
    } catch (e) {
        console.error(e);
    }
};

export const getMessages = async () => {
    const session = await auth();

    console.log('SESSION', session);
    console.log('SESSION USER', session?.user?.id);

    if (!session || !session.user) return undefined;
    const userId = session.user.id!;

    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const messages = db.collection<ChatMessage>('messages');
        return await messages
            .aggregate([
                {
                    $or: [
                        {
                            $eq: ['$target.user_id', userId],
                        },
                        {
                            $eq: ['$source.user_id', userId],
                        },
                    ],
                },
                {
                    $sort: {
                        created_at: -1,
                    },
                },
                // aggregate so that it is in the format of
                // [{  user_id: string, user_name: string, user_avatar: string, messages: ChatMessage[] }]
                {
                    $group: {
                        _id: '$source.user_id',
                        user_name: { $first: '$source.user_name' },
                        user_avatar: { $first: '$source.user_avatar' },
                        messages: { $push: '$$ROOT' },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        user_id: '$_id',
                        user_name: 1,
                        user_avatar: 1,
                        messages: 1,
                    },
                },
            ])
            .toArray() as AggregatedConversation[];
    } catch (e) {
        console.error(e);
    }
};
