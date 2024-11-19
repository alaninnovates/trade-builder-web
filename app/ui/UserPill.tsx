import { Button, HStack, Text } from '@chakra-ui/react';
import { auth, signIn, signOut } from '@/app/lib/auth';
import { Avatar } from '@/components/ui/avatar';
import { PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/ui/popover';

export const UserPill = async () => {
    const session = await auth();

    if (!session || !session.user) return null;

    return (
        <PopoverRoot positioning={{ sameWidth: true }}>
            <PopoverTrigger asChild>
                <Button h="auto" py={2} px={6} variant="ghost">
                    <HStack>
                        <Avatar src={session.user.image ?? ''}/>
                        <Text>{session.user.name}</Text>
                    </HStack>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form
                    action={async () => {
                        'use server';
                        await signOut();
                        window.location.href = '/';
                    }}
                >
                    <Button type="submit">Sign Out</Button>
                </form>
            </PopoverContent>
        </PopoverRoot>
    );
};
