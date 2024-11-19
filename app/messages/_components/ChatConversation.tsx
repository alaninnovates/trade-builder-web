'use client';
import { Box, Button, Input, Separator, Text, VStack } from '@chakra-ui/react';
import { ChatMessage } from '@/app/lib/types';
import { Avatar } from '@/components/ui/avatar';
import { GoPaperAirplane } from 'react-icons/go';
import { useState } from 'react';
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
    const [inputMessage, setInputMessage] = useState('');
    if (!person) return null;
    return (
        <VStack w={'100%'} h={'100%'} flex={1} bg="background">
            <Box display="flex" alignItems="center" gap={3} p={4}>
                <Avatar src={person.avatar}/>
                <Box>
                    <Text as="h2" fontSize="lg" fontWeight="semibold">{person.name}</Text>
                    {person.unread > 0 && (
                        <Text as="span" fontSize="sm" color="muted">{person.unread} unread messages</Text>
                    )}
                </Box>
            </Box>
            <Separator/>
            <Box flex="1" overflowY="scroll" p={4} gap={4} w={'100%'}>
                <Box display="flex" flexDirection="column" gap={4} p={4}>
                    {messages.map((msg, index) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent={msg.source.user_id !== person.id ? 'flex-end' : 'flex-start'}
                        >
                            <Box
                                maxW="70%"
                                borderRadius="lg"
                                p={3}
                            >
                                <Text fontSize="sm" fontWeight="medium">{msg.source.user_name}</Text>
                                <Text fontSize="sm">{msg.message}</Text>
                                {msg.trade && (
                                    <Box mt={2} p={2} bg="background" borderRadius="md">
                                        <Trade trade={msg.trade} editable={false}/>
                                    </Box>
                                )}
                                <Text fontSize="xs" textAlign="right" mt={1} opacity={0.7}>
                                    {msg.created_at.toLocaleString()}
                                </Text>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Separator/>
            <Box p={4} display="flex" gap={4} w="100%">
                <Input
                    type="text"
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    flexGrow={1}
                />
                <Button type="submit">
                    <GoPaperAirplane className="h-4 w-4"/>
                    <Text as="span" srOnly>Send message</Text>
                </Button>
            </Box>
        </VStack>
    );
};
