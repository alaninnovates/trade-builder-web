import { Button, HStack, Text } from '@chakra-ui/react';
import { auth } from '@/app/lib/auth';
import { Avatar } from '@/components/ui/avatar';

export const UserPill = async () => {
    const session = await auth();

    if (!session || !session.user) return null;

    return (
        <Button h="auto" py={2} px={6} variant="ghost">
            <HStack>
                <Avatar src={session.user.image ?? ''}/>
                <Text>{session.user.name}</Text>
            </HStack>
        </Button>
    );
};
