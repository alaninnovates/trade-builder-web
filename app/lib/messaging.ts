'use server';
import { ChatMessage, Trade as TradeType } from '@/app/lib/types';
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
        const messages = db.collection<ChatMessage>('messages');
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
        const messages = db.collection<ChatMessage>('messages');
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
