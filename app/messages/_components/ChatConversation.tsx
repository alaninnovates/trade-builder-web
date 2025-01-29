'use client';
import { Box, Button, Input, Separator, Text, VStack } from '@chakra-ui/react';
import { ChatMessage } from '@/app/lib/types';
import { Avatar } from '@/components/ui/avatar';
import { GoPaperAirplane } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';
import { Trade } from '@/app/ui/trade/Trade';
import { sendMessage } from '@/app/lib/database/messaging';
import { socket } from '@/app/lib/socket';

export const ChatConversation = ({
                                     person,
                                     messages,
                                     userId,
                                     userName,
                                     userAvatar,
                                 }: {
    person:
        | { id: string; name: string; avatar: string; unread: number }
        | undefined;
    messages: ChatMessage[];
    userId: string;
    userName: string;
    userAvatar: string;
}) => {
    const chatboxRef = useRef<HTMLDivElement>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [laterMessages, setLaterMessages] = useState<ChatMessage[]>([]);
    useEffect(() => {
        socket.connect();

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.disconnect();
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    useEffect(() => {
        console.log('PERSON', person);
        if (!person) return;
        console.log('EMIT JOIN');
        socket.emit('join', person.id, userId);

        function onMessage(message: ChatMessage) {
            console.log('Received message', message);
            message.created_at = new Date(message.created_at);
            setLaterMessages((messages) => [...messages, message]);
        }
        socket.on('message', onMessage);

        return () => {
            socket.off('message', onMessage);
        };
    }, [person]);

    useEffect(() => {
        console.log('SCROLL');
        chatboxRef.current?.scrollTo({
            top: chatboxRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [messages, laterMessages]);

    if (!person || !isConnected) return null;
    return (
        <VStack w={'100%'} h={'100%'} flex={1} bg="background">
            <Box display="flex" alignItems="center" gap={3} p={4}>
                <Avatar src={person.avatar}/>
                <Box>
                    <Text as="h2" fontSize="lg" fontWeight="semibold">{person.name}</Text>
                    {/*{person.unread > 0 && (*/}
                    {/*    <Text as="span" fontSize="sm" color="muted">{person.unread} unread messages</Text>*/}
                    {/*)}*/}
                </Box>
            </Box>
            <Separator/>
            <Box flex="1" overflowY="scroll" p={4} gap={4} w={'100%'} ref={chatboxRef}>
                <Box display="flex" flexDirection="column" gap={4} p={4}>
                    {[...messages, ...laterMessages].map((msg, index) => (
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
                <Button onClick={async () => {
                    setInputMessage('');
                    socket.emit('message', {
                        source: {
                            user_id: userId,
                            user_name: userName,
                            user_avatar: userAvatar,
                        },
                        target: {
                            user_id: person.id,
                            user_name: person.name,
                            user_avatar: person.avatar,
                        },
                        message: inputMessage,
                    });
                    await sendMessage({
                        user_id: person.id,
                        user_name: person.name,
                        user_avatar: person.avatar,
                    }, inputMessage);
                }}>
                    <GoPaperAirplane className="h-4 w-4"/>
                    <Text as="span" srOnly>Send message</Text>
                </Button>
            </Box>
        </VStack>
    );
};
