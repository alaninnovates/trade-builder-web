import client from '@/app/lib/database/db';
import { PostedTrade } from '@/app/lib/types';
import { ObjectId } from 'bson';

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
