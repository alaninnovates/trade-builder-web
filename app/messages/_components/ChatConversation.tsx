import { Box, Flex, Input, Separator, Text } from '@chakra-ui/react';
import { ChatMessage } from '@/app/lib/types';
import { Trade } from '@/app/ui/trade/Trade';

export const ChatConversation = ({
	person,
	messages,
}: {
	person:
		| { id: string; name: string; avatar: string; unread: number }
		| undefined;
	messages: ChatMessage[];
}) => {
	if (!person) return null;
	console.log('PERSON', person);
	return (
		<Flex flex="1" direction="column">
			<Text p={4} fontWeight="semibold">
				{person.name}
			</Text>
			<Separator />
			<Box flex="1" overflowY="scroll" p={4} gap={4}>
				{messages.map((msg, index) => (
					<Flex
						key={index}
						justify={
							msg.source.user_id !== person.id
								? 'flex-end'
								: 'flex-start'
						}
					>
						<Box
							maxW="70%"
							bg={
								msg.source.user_id !== person.id
									? 'primary'
									: 'muted'
							}
							color={
								msg.source.user_id !== person.id
									? 'primary.50'
									: 'black'
							}
							borderRadius="lg"
							p={3}
						>
							<Text fontSize="sm" fontWeight="medium">
								{msg.source.user_name}
							</Text>
							<Text fontSize="sm">{msg.message}</Text>
							{msg.trade && (
								<Trade trade={msg.trade} editable={false} />
							)}
							<Text
								fontSize="xs"
								textAlign="right"
								mt={1}
								opacity={0.7}
							>
								{msg.created_at.toLocaleString()}
							</Text>
						</Box>
					</Flex>
				))}
			</Box>
			<Separator />
			<Box p={4}>
				<Input
					type="text"
					placeholder="Type a message..."
					w="full"
					p={2}
					borderRadius="md"
					border="1px"
					borderColor="gray.200"
					_focus={{ outline: 'none', ring: 2, ringColor: 'primary' }}
				/>
			</Box>
		</Flex>
	);
};
