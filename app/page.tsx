import { Button, Card, Center, Text } from '@chakra-ui/react';

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
                    <a href="/login/discord">
                        <Button type="button">Sign in with Discord</Button>
                    </a>
                </Card.Footer>
            </Card.Root>
        </Center>
    );
}
