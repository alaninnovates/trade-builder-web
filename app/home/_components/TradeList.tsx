"use client";
import { VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface PostedTrade {
	id: string;
}

export const TradeList = () => {
	const [trades, setTrades] = useState<PostedTrade[]>([]);
	return <VStack spacing={4} align="stretch"></VStack>;
};
