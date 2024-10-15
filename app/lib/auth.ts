import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"

const protectedRoutes = [
    '/home',
    '/create',
    '/messages',
]

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isProtected = protectedRoutes.some(route => route.includes(nextUrl.pathname));
            if (!isLoggedIn && isProtected) {
                return false;
            }
            return true;
        },
    },
    providers: [Discord]
})