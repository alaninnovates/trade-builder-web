import { Box, Flex, Input, Separator, Text } from '@chakra-ui/react';

export const ChatConversation = () => {
    return (
        <Flex flex="1" direction="column">
            <Text p={4} fontWeight="semibold">Messages</Text>
            <Separator/>
            <Box flex="1" overflowY="scroll" p={4} gap={4}>
                {[
                    { sender: 'Alice Smith', message: 'Hey there! How\'s it going?', time: '10:30 AM' },
                    {
                        sender: 'You',
                        message: 'Hi Alice! I\'m doing well, thanks. How about you?',
                        time: '10:32 AM',
                    },
                    {
                        sender: 'Alice Smith',
                        message: 'I\'m great! Just wanted to check in about the project.',
                        time: '10:33 AM',
                    },
                    { sender: 'You', message: 'Sure, what would you like to know?', time: '10:35 AM' },
                    {
                        sender: 'Alice Smith',
                        message: 'Can we schedule a quick call to discuss the timeline?',
                        time: '10:36 AM',
                    },
                ].map((msg, index) => (
                    <Flex key={index} justify={msg.sender === 'You' ? 'flex-end' : 'flex-start'}>
                        <Box
                            maxW="70%"
                            bg={msg.sender === 'You' ? 'primary' : 'muted'}
                            color={msg.sender === 'You' ? 'primary.50' : 'black'}
                            borderRadius="lg"
                            p={3}
                        >
                            <Text fontSize="sm" fontWeight="medium">{msg.sender}</Text>
                            <Text fontSize="sm">{msg.message}</Text>
                            <Text fontSize="xs" textAlign="right" mt={1} opacity={0.7}>{msg.time}</Text>
                        </Box>
                    </Flex>
                ))}
            </Box>
            <Separator/>
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
        </Flex>);
};
