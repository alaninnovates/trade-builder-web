import { cookies } from 'next/headers';
import { cache } from 'react';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import client from '@/app/lib/database/db';
import { Session, User } from '@/app/lib/types';
import { withoutId } from '@/app/lib/database/utils';

const connectDb = async () => {
    const mongoClient = await client.connect();
    const db = mongoClient.db('trade-builder');
    const sessions = db.collection<Session>('sessions');
    const users = db.collection<User>('users');
    return { db, sessions, users };
};

export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        path: '/',
    });
}

export async function deleteSessionTokenCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set('session', '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
        path: '/',
    });
}

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value ?? null;
    if (token === null) {
        return { session: null, user: null };
    }
    return await validateSessionToken(token);
});

export function generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
}

export async function createSession(token: string, userId: string): Promise<Session> {
    const { sessions } = await connectDb();
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        id: sessionId,
        user_id: userId,
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    };
    await sessions.insertOne(session);
    return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    const { sessions, users } = await connectDb();
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const result = await sessions.findOne({ id: sessionId });
    if (result === null) {
        return { session: null, user: null };
    }
    const session = withoutId(result);
    const userResult = await users.findOne({ user_id: session.user_id });
    if (userResult === null) {
        return { session: null, user: null };
    }
    const user = withoutId(userResult);
    if (Date.now() >= session.expires_at.getTime()) {
        await sessions.deleteOne({ id: sessionId });
        return { session: null, user: null };
    }
    if (Date.now() >= session.expires_at.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await sessions.updateOne({ id: sessionId }, { $set: { expires_at: session.expires_at } });
    }
    return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
    const { sessions } = await connectDb();
    await sessions.deleteOne({ id: sessionId });
}

export type SessionValidationResult =
    | { session: Session; user: User }
    | { session: null; user: null };
