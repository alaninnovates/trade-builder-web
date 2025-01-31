import client from '@/app/lib/database/db';
import { User } from '@/app/lib/types';
import { withoutId } from '@/app/lib/database/utils';
import { WithId } from 'mongodb';

const getProfileURL = (id: string, avatar: string, discriminator: string) => {
    let imageUrl: string;
    if (avatar === null) {
        const defaultAvatarNumber =
            discriminator === '0'
                ? Number(BigInt(id) >> BigInt(22)) % 6
                : parseInt(discriminator) % 5;
        imageUrl = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
    } else {
        const format = avatar.startsWith('a_') ? 'gif' : 'png';
        imageUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.${format}`;
    }
    return imageUrl;
};

export const createUser = async (profile: any): Promise<User> => {
    const user = {
        user_id: profile.id.toString(),
        global_name: profile.global_name,
        username: profile.username,
        email: profile.email,
        image: getProfileURL(profile.id, profile.avatar, profile.discriminator),
        premium_level: 0,
        premium_since: new Date(),
        bookmarks: [],
    };
    const mongoClient = await client.connect();
    const db = mongoClient.db('trade-builder');
    const users = db.collection('users');
    await users.insertOne(user);
    return user;
};

export const getUser = async (id: string): Promise<User | null> => {
    const mongoClient = await client.connect();
    const db = mongoClient.db('trade-builder');
    const users = db.collection<User>('users');
    const userResult = await users.findOne({ user_id: id });
    if (userResult === null) {
        return null;
    }
    return withoutId(userResult);
};
