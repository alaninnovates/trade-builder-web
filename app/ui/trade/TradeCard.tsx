import { ChatMessage, PostedTrade } from '@/app/lib/types';
import { Box, Button, Card, HStack, Stack, Text } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { Tooltip } from '@/components/ui/tooltip';
import { Trade } from '@/app/ui/trade/Trade';
import { FaMessage } from 'react-icons/fa6';
import { FaBookmark } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import client from '@/app/lib/db';
import { TradeModal } from '@/app/ui/trade/TradeModal';

export const TradeCard = ({ trade }: { trade: PostedTrade }) => {
    return (
        <Card.Root>
            <Card.Header>
                <HStack mb="6" gap="3">
                    <Avatar
                        src={trade.user_avatar}
                        name={trade.user_name}
                        shape="rounded"
                    />
                    <Stack gap="1">
                        <Text fontWeight="medium" lineHeight="1">
                            {trade.user_name}
                        </Text>
                        <Text color="fg.subtle" lineHeight="1">
                            @{trade.user_name}
                        </Text>
                    </Stack>
                </HStack>
            </Card.Header>
            <Box bgGradient="to-r" gradientFrom="green.200" gradientTo="blue.200" p={6}>
                <Trade trade={trade.trade}/>
            </Box>
            <Card.Footer pt={4} justifyContent="center" alignItems="center">
                <HStack gap="2">
                    <Tooltip content="Send offer" aria-label="Send offer" openDelay={0}>
                        <TradeModal trigger={
                            <Button variant="subtle">
                                <MdLocalOffer/>
                            </Button>
                        }/>
                    </Tooltip>
                    <Tooltip content="Send message" aria-label="Send message" openDelay={0}>
                        <Button variant="subtle">
                            <FaMessage/>
                        </Button>
                    </Tooltip>
                    <Tooltip content="Bookmark" aria-label="Bookmark" openDelay={0}>
                        <Button variant="subtle">
                            <FaBookmark/>
                        </Button>
                    </Tooltip>
                </HStack>
            </Card.Footer>
        </Card.Root>
    );
};

const sendMessage = async () => {
    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const messages = db.collection<ChatMessage>('messages');
    } catch (e) {
        console.error(e);
    }
};
