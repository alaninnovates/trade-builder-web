import { getMessages } from '@/app/lib/database/messaging';
import { Chat } from './_components/Chat';
import { getCurrentSession } from '@/app/lib/auth/session';
import { Button, Card, Center, Text } from '@chakra-ui/react';

const Page = async () => {
	const messages = await getMessages();
	const {user} = await getCurrentSession();
	console.log(messages);

	if (!messages || !user) {
		return (
			<Center h={'100%'}>
				<Card.Root w={'100%'} maxW={'400px'}>
					<Card.Header>
						<Card.Title textAlign="center">Sign in to view messages!</Card.Title>
					</Card.Header>
					<Card.Body alignItems="center" justifyContent="center">
						<Text>Trading is more fun with friends :)</Text>
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

	return <Chat messages={messages} userId={user.user_id} userName={user.username} userGlobalName={user.global_name} userAvatar={user.image} />;
};

export default Page;
