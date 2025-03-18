'use client';
import { Trade as TradeType } from '@/app/lib/types';
import { Trade } from '@/app/ui/trade/Trade';
import { Box, Button, Center, CenterProps, Flex, Group, Text } from '@chakra-ui/react';
import { ItemListPopover } from '@/app/ui/trade/ItemListPopover';
import React, { useCallback, useMemo } from 'react';

export const TradeEditor = ({ trade, setTrade, ...props }: {
    trade: TradeType,
    setTrade: React.Dispatch<React.SetStateAction<TradeType>>,
} & CenterProps) => {
    const handleItemRemove = useCallback((group: 'offering' | 'lookingFor', item: string) => {
        setTrade((prevTrade) => {
            const copy = { ...prevTrade };
            delete copy[group][item];
            return copy;
        });
    }, [setTrade]);

    const handleItemSelect = useCallback((group: 'offering' | 'lookingFor', item: string, data: any) => {
        setTrade((prevTrade) => ({
            ...prevTrade,
            [group]: {
                ...prevTrade[group],
                [item]: data != null ? data : (prevTrade[group][item] as number || 0) + 1,
            },
        }));
    }, [setTrade]);

    const sortedOffering = useMemo(() => Object.fromEntries(Object.entries(trade.offering).sort(([a], [b]) => a.localeCompare(b))), [trade.offering]);
    const sortedLookingFor = useMemo(() => Object.fromEntries(Object.entries(trade.lookingFor).sort(([a], [b]) => a.localeCompare(b))), [trade.lookingFor]);

    return (
        <Center height="100%" flexDirection="column" gap={4} {...props} zIndex="popover">
            <Trade trade={trade} editable={true} onItemRemove={handleItemRemove} />
            <Flex w="100%" maxW="3xl" flexDir={{ base: 'column', lg: 'row' }} gap={4}>
                <Box flex={1} display="flex" flexDir={{ base: 'column', lg: 'row' }} gap={4}>
                    <Text hideFrom="lg" textAlign="center">Offering</Text>
                    <Group flex={1} justifyContent={{ base: 'center', lg: 'flex-start' }}>
                        <ItemListPopover trigger={<Button>Add Item</Button>} onItemSelect={(item, data) => handleItemSelect('offering', item, data)} side={'left'} />
                        <Button onClick={() => setTrade((trade) => ({ ...trade, offering: {} }))}>Clear All</Button>
                        <Button onClick={() => setTrade((trade) => ({ ...trade, offering: sortedOffering }))}>Sort</Button>
                    </Group>
                </Box>
                <Box flex={1} display="flex" flexDir={{ base: 'column', lg: 'row' }} gap={4}>
                    <Text hideFrom="lg" textAlign="center">Looking For</Text>
                    <Group flex={1} justifyContent={{ base: 'center', lg: 'flex-end' }}>
                        <ItemListPopover trigger={<Button>Add Item</Button>} onItemSelect={(item, data) => handleItemSelect('lookingFor', item, data)} side={'right'} />
                        <Button onClick={() => setTrade((trade) => ({ ...trade, lookingFor: {} }))}>Clear All</Button>
                        <Button onClick={() => setTrade((trade) => ({ ...trade, lookingFor: sortedLookingFor }))}>Sort</Button>
                    </Group>
                </Box>
            </Flex>
        </Center>
    );
};
