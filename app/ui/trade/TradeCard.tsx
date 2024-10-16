import { PostedTrade } from '@/app/lib/types';
import { Box, Button, Card, HStack, Stack, Strong, Text } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { Trade } from '@/app/ui/trade/Trade';
import { FaMessage } from 'react-icons/fa6';
import { FaBookmark } from 'react-icons/fa';

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
                <Trade trade={trade} />
            </Box>
            <Card.Footer pt={4} justifyContent="center" alignItems="center">
                <HStack gap="2">
                    <Button variant="subtle">
                        <FaMessage />
                    </Button>
                    <Button variant="subtle">
                        <FaBookmark />
                    </Button>
                </HStack>
            </Card.Footer>
        </Card.Root>
    )
}
