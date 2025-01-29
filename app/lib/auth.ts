import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';
import client from '@/app/lib/database/db';
import { MongoDBAdapter } from '@auth/mongodb-adapter';

declare module '@auth/core/adapters' {
    interface AdapterUser {
        id: string;
        discord_user_id: string;
        name: string;
        email: string;
        image: string;
        emailVerified: Date | null;
    }
}

const protectedRoutes = ['/home', '/create', '/messages'];

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isProtected = protectedRoutes.some((route) =>
                route.includes(nextUrl.pathname),
            );
            return !(!isLoggedIn && isProtected);

        },
        session: async ({ session, user }) => {
            session.user.id = user.discord_user_id;
            return session;
        },
    },
    providers: [Discord({
        profile(profile) {
            if (profile.avatar === null) {
                const defaultAvatarNumber =
                    profile.discriminator === '0'
                        ? Number(BigInt(profile.id) >> BigInt(22)) % 6
                        : parseInt(profile.discriminator) % 5;
                profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
            } else {
                const format = profile.avatar.startsWith('a_') ? 'gif' : 'png';
                profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
            }
            return {
                discord_user_id: profile.id,
                name: profile.global_name ?? profile.username,
                email: profile.email,
                image: profile.image_url,
            };
        },
    })],
    adapter: MongoDBAdapter(client, {
        databaseName: 'auth',
    }),
});
