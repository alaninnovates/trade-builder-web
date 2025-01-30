import { generateSessionToken, createSession, setSessionTokenCookie } from "@/app/lib/auth/session";
import { discord } from '@/app/lib/auth/oauth';
import { cookies } from "next/headers";

import type { OAuth2Tokens } from "arctic";
import { createUser, getUser } from '@/app/lib/database/user';

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const cookieStore = await cookies();
    const storedState = cookieStore.get("discord_oauth_state")?.value ?? null;
    if (code === null || state === null || storedState === null) {
        return new Response(null, {
            status: 400
        });
    }
    if (state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    let tokens: OAuth2Tokens;
    try {
        tokens = await discord.validateAuthorizationCode(code, null);
    } catch (e) {
        // Invalid code or client credentials
        return new Response(null, {
            status: 400
        });
    }
    const discordUserResponse = await fetch("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `Bearer ${tokens.accessToken()}`
        }
    });
    const discordUser = await discordUserResponse.json();
    const discordUserId = discordUser.id;

    const existingUser = await getUser(discordUserId);

    if (existingUser !== null) {
        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, existingUser.user_id);
        await setSessionTokenCookie(sessionToken, session.expires_at);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    }

    const user = await createUser(discordUser);

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.user_id);
    await setSessionTokenCookie(sessionToken, session.expires_at);
    return new Response(null, {
        status: 302,
        headers: {
            Location: "/"
        }
    });
}
