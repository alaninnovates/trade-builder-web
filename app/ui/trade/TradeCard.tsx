'use client';
import { useState } from 'react';
import { PostedTradeWithStringId } from '@/app/lib/types';
import { Box, Button, Card, HStack, Stack, Text } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { Tooltip } from '@/components/ui/tooltip';
import { Trade } from '@/app/ui/trade/Trade';
import { FaMessage } from 'react-icons/fa6';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import { TradeModal } from '@/app/ui/trade/TradeModal';
import { MessageModal } from './MessageModal';
import { bookmarkTrade, unbookmarkTrade } from '@/app/lib/database/bookmarks';

export const TradeCard = ({ userId, trade, bookmarked }: { userId?: string, trade: PostedTradeWithStringId, bookmarked: boolean }) => {
    const [bookmarkedLocal, setBookmarkedLocal] = useState(bookmarked);

    return (
        <Card.Root>
            <Card.Header>
                <HStack mb="6" gap="3">
                    <Avatar
                        src={trade.user_avatar}
                        name={trade.user_global_name ?? trade.user_name}
                        shape="rounded"
                    />
                    <Stack gap="1">
                        <Text fontWeight="medium" lineHeight="1">
                            {trade.user_global_name ?? trade.user_name}
                        </Text>
                        <Text color="fg.subtle" lineHeight="1">
                            @{trade.user_name}
                        </Text>
                    </Stack>
                </HStack>
            </Card.Header>
            <Box
                bgGradient="to-r"
                gradientFrom="green.200"
                gradientTo="blue.200"
                p={6}
            >
                <Trade trade={trade.trade}/>
            </Box>
            {userId && userId !== trade.user_id && (
                <Card.Footer pt={4} justifyContent="center" alignItems="center">
                    <HStack gap="2">
                        <Tooltip
                            content="Send offer"
                            aria-label="Send offer"
                            openDelay={0}
                        >
                            <TradeModal
                                targetUser={{
                                    user_id: trade.user_id,
                                    user_name: trade.user_name,
                                    user_global_name: trade.user_global_name,
                                    user_avatar: trade.user_avatar,
                                }}
                                trigger={
                                    <Button variant="subtle">
                                        <MdLocalOffer/>
                                    </Button>
                                }
                            />
                        </Tooltip>
                        <Tooltip
                            content="Send message"
                            aria-label="Send message"
                            openDelay={0}
                        >
                            <MessageModal
                                targetUser={{
                                    user_id: trade.user_id,
                                    user_name: trade.user_name,
                                    user_global_name: trade.user_global_name,
                                    user_avatar: trade.user_avatar,
                                }}
                                trigger={
                                    <Button variant="subtle">
                                        <FaMessage/>
                                    </Button>
                                }
                            />
                        </Tooltip>
                        <Tooltip
                            content="Bookmark"
                            aria-label="Bookmark"
                            openDelay={0}
                        >
                            <Button variant="subtle" onClick={async () => {
                                if (bookmarkedLocal) {
                                    await unbookmarkTrade(userId, trade._id);
                                    setBookmarkedLocal(false);
                                } else {
                                    await bookmarkTrade(userId, trade._id);
                                    setBookmarkedLocal(true);
                                }
                            }}>
                                {bookmarkedLocal ? <FaBookmark/> : <FaRegBookmark/>}
                            </Button>
                        </Tooltip>
                    </HStack>
                </Card.Footer>
            )}
        </Card.Root>
    );
};
