'use client';
import { Trade as TradeType } from '@/app/lib/types';
import { Trade } from '@/app/ui/trade/Trade';
import { Button, Center, Flex, Group } from '@chakra-ui/react';
import { ItemListDialog } from '@/app/ui/trade/ItemListDialog';
import React from 'react';

export const TradeEditor = ({trade, setTrade}: {
    trade: TradeType,
    setTrade: React.Dispatch<React.SetStateAction<TradeType>>,
}) => {
    return (
        <Center height="100%" flexDirection="column" gap={4}>
            <Trade trade={trade} editable={true} onItemRemove={(group: 'offering' | 'lookingFor', item: string) => {
                const copy = { ...trade };
                delete copy[group][item];
                setTrade(copy);
            }}/>
            <Flex w="100%" maxW="3xl">
                <Group flex={1}>
                    <ItemListDialog trigger={<Button>Add Item</Button>} onItemSelect={(item) => {
                        setTrade({
                            ...trade,
                            offering: {
                                ...trade.offering,
                                [item]: (trade.offering[item] || 0) + 1,
                            },
                        });
                    }}/>
                    <Button onClick={() => {
                        setTrade((trade) => ({
                            ...trade,
                            offering: {},
                        }));
                    }}>Clear All</Button>
                    <Button onClick={() => {
                        setTrade((trade) => ({
                            ...trade,
                            offering: Object.fromEntries(Object.entries(trade.offering).sort(([a], [b]) => a.localeCompare(b))),
                        }));
                    }}>Sort</Button>
                </Group>
                <Group flex={1} justifyContent="flex-end">
                    <ItemListDialog trigger={<Button>Add Item</Button>} onItemSelect={(item) => {
                        setTrade({
                            ...trade,
                            lookingFor: {
                                ...trade.lookingFor,
                                [item]: (trade.lookingFor[item] || 0) + 1,
                            },
                        });
                    }}/>
                    <Button onClick={() => {
                        setTrade((trade) => ({
                            ...trade,
                            lookingFor: {},
                        }));
                    }}>Clear All</Button>
                    <Button onClick={() => {
                        setTrade((trade) => ({
                            ...trade,
                            lookingFor: Object.fromEntries(Object.entries(trade.lookingFor).sort(([a], [b]) => a.localeCompare(b))),
                        }));
                    }}>Sort</Button>
                </Group>
            </Flex>
        </Center>
    );
};
