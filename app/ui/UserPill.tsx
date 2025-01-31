import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { PopoverContent, PopoverRoot, PopoverTrigger, PopoverBody, PopoverArrow } from '@/components/ui/popover';
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
                    <HStack gap="3">
                        <Avatar
                            src={user.image}
                            name={user.global_name ?? user.username}
                            shape="rounded"
                        />
                        <Stack gap="1" align="flex-start">
                            <Text fontWeight="medium" lineHeight="1">
                                {user.global_name ?? user.username}
                            </Text>
                            <Text color="fg.subtle" lineHeight="1">
                                @{user.username}
                            </Text>
                        </Stack>
                    </HStack>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody display="flex" justifyContent="center">
                    <form action={logout}>
                        <Button type="submit">Sign Out</Button>
                    </form>
                </PopoverBody>
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
