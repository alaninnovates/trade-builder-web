"use server";
import client from '@/app/lib/database/db';
import { PostedTrade, Trade, User } from '@/app/lib/types';
import { ObjectId } from 'bson';
import { WithoutId } from 'mongodb';

export const getTrades = async () => {
    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const trades = db.collection<PostedTrade>('posts');
        return await trades.find().sort({
            created_at: -1,
        }).limit(25).toArray();
    } catch (e) {
        console.error(e);
    }
};

export const getTrade = async (id: string) => {
    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const trades = db.collection<PostedTrade>('posts');
        return await trades.findOne({ _id: new ObjectId(id) });
    } catch (e) {
        console.error(e);
    }
};

export const postTrade = async (trade: Trade, user: User, expireTime: Date) => {
    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const trades = db.collection<WithoutId<PostedTrade>>('posts');
        const tradeRes = await trades.insertOne({
            user_id: user.user_id,
            user_name: user.username,
            user_global_name: user.global_name,
            user_avatar: user.image,
            created_at: new Date(),
            expire_time: expireTime,
            server_sync: false,
            locked: false,
            trade,
        });
        return tradeRes.insertedId.toString();
    } catch (e) {
        console.error(e);
    }
};
