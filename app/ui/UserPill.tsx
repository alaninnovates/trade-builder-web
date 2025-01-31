import { Button, HStack, Text } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/ui/popover';
import { deleteSessionTokenCookie, getCurrentSession, invalidateSession } from '@/app/lib/auth/session';
import { redirect } from 'next/navigation';

export const UserPill = async () => {
    const { user } = await getCurrentSession();

    if (user === null) {
        return null;
    }

    return (
        <PopoverRoot positioning={{ sameWidth: true }}>
            <PopoverTrigger asChild>
                <Button h="auto" py={2} px={6} variant="ghost">
                    <HStack>
                        <Avatar src={user.image ?? ''}/>
                        <Text>{user.global_name ?? user.username}</Text>
                    </HStack>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={logout}>
                    <Button type="submit">Sign Out</Button>
                </form>
            </PopoverContent>
        </PopoverRoot>
    );
};

async function logout(): Promise<ActionResult> {
    "use server";
    const { session } = await getCurrentSession();
    if (!session) {
        return {
            error: "Unauthorized"
        };
    }

    await invalidateSession(session.id);
    await deleteSessionTokenCookie();
    return redirect("/");
}

interface ActionResult {
    error: string | null;
}
