"use server";
import client from '@/app/lib/database/db';
import { User } from '@/app/lib/types';

export const bookmarkTrade = async (userId: string, tradeId: string) => {
    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const users = db.collection<User>('users');
        await users.updateOne(
            { user_id: userId },
            { $addToSet: { bookmarks: tradeId } },
            { upsert: true },
        );
    } catch (e) {
        console.error(e);
    }
};

export const unbookmarkTrade = async (userId: string, tradeId: string) => {
    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const users = db.collection<User>('users');
        await users.updateOne(
            { user_id: userId },
            { $pull: { bookmarks: tradeId } },
        );
    } catch (e) {
        console.error(e);
    }
};

export const getBookmarkedTrades = async (userId: string) => {
    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const users = db.collection<User>('users');
        const user = await users.findOne({ user_id: userId });
        return user?.bookmarks;
    } catch (e) {
        console.error(e);
    }
};

export const isTradeBookmarked = async (userId: string, tradeId: string) => {
    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const users = db.collection<User>('users');
        const user = await users.findOne({ user_id: userId });
        return user?.bookmarks.includes(tradeId);
    } catch (e) {
        console.error(e);
    }
}
