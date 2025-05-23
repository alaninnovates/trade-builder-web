import {
	Box,
	Button,
	Flex,
	Separator,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import React from 'react';

export const PeopleList = ({
	people,
	setActiveConversation,
}: {
	people: { id: string; name: string; globalName: string | null; avatar: string; unread: number }[];
	setActiveConversation: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
	return (
		<Box flex={1 / 6}>
			<Text p={4}>Chats</Text>
			<Separator />
			<VStack gap={4} mt={4} flex={1} overflowY="scroll" h={'80%'} scrollbarWidth="thin">
				{people.map((contact) => (
					<Button
						w="100%"
						onClick={() => setActiveConversation(contact.id)}
						key={contact.id}
						variant="ghost"
					>
						<Flex
							w="100%"
							p={4}
							alignItems="center"
							direction="row"
							key={contact.name}
							gap={4}
						>
							<Avatar
								src={contact.avatar}
							/>
							<Box flex="1" minW="0">
								<Text fontSize="sm" fontWeight="medium">
									{contact.name}
								</Text>
							</Box>
							{/*{contact.unread > 0 && (*/}
							{/*	<Badge*/}
							{/*		colorPalette="red"*/}
							{/*		className="rounded-full"*/}
							{/*	>*/}
							{/*		{contact.unread}*/}
							{/*	</Badge>*/}
							{/*)}*/}
						</Flex>
					</Button>
				))}
			</VStack>
		</Box>
	);
};
