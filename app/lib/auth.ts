import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';

const protectedRoutes = ['/home', '/create', '/messages'];

export const { handlers, signIn, signOut, auth } = NextAuth({
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isProtected = protectedRoutes.some((route) =>
				route.includes(nextUrl.pathname),
			);
			if (!isLoggedIn && isProtected) {
				return false;
			}
			return true;
		},
		async jwt({ token, account, profile }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			if (profile) {
				token.id = profile.id;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id as string;
			return session;
		},
	},
	providers: [Discord],
});
