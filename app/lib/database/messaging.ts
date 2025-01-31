'use server';
import { AggregatedConversation, ChatMessage, ChatMessageUser, Trade as TradeType } from '@/app/lib/types';
import client from '@/app/lib/database/db';
import { socket } from '@/app/lib/socket';
import { getCurrentSession } from '@/app/lib/auth/session';

export const sendTradeOffer = async (targetUser: ChatMessageUser, trade: TradeType) => {
    const { user } = await getCurrentSession();

    if (!user) {
        return;
    }

    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const messages = db.collection<Omit<ChatMessage, '_id'>>('messages');
        const sourceUser: ChatMessageUser = {
            user_id: user.user_id,
            user_name: user.username,
            user_global_name: user.global_name,
            user_avatar: user.image,
        };
        socket.emit('message', {
            target: targetUser,
            source: sourceUser,
            message: '',
            trade,
        });
        await messages.insertOne({
            target: targetUser,
            source: sourceUser,
            message: '',
            trade,
            created_at: new Date(),
        });
    } catch (e) {
        console.error(e);
    }
};

export const sendMessage = async (targetUser: ChatMessageUser, message: string) => {
    const { user } = await getCurrentSession();

    if (!user) {
        return;
    }

    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const messages = db.collection<Omit<ChatMessage, '_id'>>('messages');
        const sourceUser: ChatMessageUser = {
            user_id: user.user_id,
            user_name: user.username,
            user_global_name: user.global_name,
            user_avatar: user.image,
        };
        socket.emit('message', {
            target: targetUser,
            source: sourceUser,
            message,
        });
        await messages.insertOne({
            target: targetUser,
            source: sourceUser,
            message,
            created_at: new Date(),
        });
    } catch (e) {
        console.error(e);
    }
};

export const getMessages = async (): Promise<AggregatedConversation[] | undefined> => {
    const { user } = await getCurrentSession();

    if (!user) {
        return;
    }

    const userId = user.user_id;

    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const messages = db.collection<ChatMessage>('messages');
        return (
            await messages
                .aggregate([
                    {
                        $sort: { created_at: 1 },
                    },
                    {
                        $group: {
                            _id: {
                                user_1: {
                                    $cond: {
                                        if: {
                                            $lt: [
                                                '$source.user_id',
                                                '$target.user_id',
                                            ],
                                        },
                                        then: '$source.user_id',
                                        else: '$target.user_id',
                                    },
                                },
                                user_2: {
                                    $cond: {
                                        if: {
                                            $lt: [
                                                '$source.user_id',
                                                '$target.user_id',
                                            ],
                                        },
                                        then: '$target.user_id',
                                        else: '$source.user_id',
                                    },
                                },
                            },
                            messages: {
                                $push: {
                                    _id: '$_id',
                                    target: '$target',
                                    source: '$source',
                                    message: '$message',
                                    created_at: '$created_at',
                                    trade: '$trade',
                                },
                            },
                        },
                    },
                    {
                        $match: {
                            $or: [
                                {
                                    '_id.user_1': userId,
                                },
                                {
                                    '_id.user_2': userId,
                                },
                            ],
                        },
                    },
                    {
                        $project: {
                            messages: 1,
                            user_id: {
                                $cond: {
                                    if: {
                                        $eq: ['$_id.user_1', userId],
                                    },
                                    then: '$_id.user_2',
                                    else: '$_id.user_1',
                                },
                            },
                        },
                    },
                ])
                .toArray()
        ).map((convo) => ({
            user_id: convo.user_id,
            user_name:
                convo.messages.find(
                    (m: { source: { user_id: string } }) =>
                        m.source.user_id !== userId,
                )?.source.user_name ?? convo.messages[0].target.user_name,
            user_global_name:
                convo.messages.find(
                    (m: { source: { user_id: string } }) =>
                        m.source.user_id !== userId,
                )?.source.user_global_name ??
                convo.messages[0].target.user_global_name,
            user_avatar:
                convo.messages.find(
                    (m: { source: { user_id: string } }) =>
                        m.source.user_id !== userId,
                )?.source.user_avatar ?? convo.messages[0].target.user_avatar,
            messages: convo.messages.map(
                (m: {
                    target: any;
                    source: any;
                    message: any;
                    trade: any;
                    created_at: any;
                }) =>
                    ({
                        target: m.target,
                        source: m.source,
                        message: m.message,
                        trade: m.trade,
                        created_at: m.created_at,
                    } as ChatMessage),
            ),
        })) as AggregatedConversation[];
    } catch (e) {
        console.error(e);
    }
};
