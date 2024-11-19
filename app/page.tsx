import { Button, Card, Center, Text } from '@chakra-ui/react';
import { signIn } from '@/app/lib/auth';

export default function Home() {
    return (
        <Center h={'100%'}>
            <Card.Root w={'100%'} maxW={'400px'}>
                <Card.Header>
                    <Card.Title textAlign="center">Welcome to Trade Builder</Card.Title>
                </Card.Header>
                <Card.Body alignItems="center" justifyContent="center">
                    <Text>Sign in to get started!</Text>
                </Card.Body>
                <Card.Footer justifyContent="center">
                        <form
                            action={async () => {
                                'use server';
                                await signIn('discord', { redirectTo: '/home' });
                            }}
                        >
                                <Button type="submit">Sign in with Discord</Button>
                        </form>
                </Card.Footer>
            </Card.Root>
        </Center>
    );
}
