import { Badge, Box, Button, Flex, Separator, Text, VStack } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import React from 'react';

export const PeopleList = ({ people, setActiveConversation }: {
    people: { name: string, unread: number }[];
    setActiveConversation: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    return (
        <Box flex={1 / 3}>
            <Text p={4}>Messages</Text>
            <Separator/>
            <VStack gap={0} flex={1} overflowY="scroll">
                {[
                    { name: 'Alice Smith', status: 'online', unread: 3 },
                    { name: 'Bob Johnson', status: 'offline', unread: 0 },
                    { name: 'Charlie Brown', status: 'online', unread: 1 },
                    { name: 'David Lee', status: 'offline', unread: 0 },
                    { name: 'Eva Garcia', status: 'online', unread: 2 },
                ].map((contact) => (
                    <Button w="100%" onClick={() => setActiveConversation(contact.name)} key={contact.name}>
                        <Flex w="100%" p={4} alignItems="center" direction="row" key={contact.name} gap={4}>
                            <Avatar src={`https://api.dicebear.com/6.x/initials/svg?seed=${contact.name}`}/>
                            <Box flex="1" minW="0">
                                <Text fontSize="sm" fontWeight="medium">{contact.name}</Text>
                                {/*<Text fontSize="xs" color="gray.500">{contact.status}</Text>*/}
                            </Box>
                            {contact.unread > 0 && (
                                <Badge colorPalette="red" className="rounded-full">
                                    {contact.unread}
                                </Badge>
                            )}
                        </Flex>
                    </Button>
                ))}
            </VStack>
        </Box>
    );
};
