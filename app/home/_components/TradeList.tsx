import { Box, VStack } from '@chakra-ui/react';
import { TradeCard } from '@/app/ui/trade/TradeCard';
import { getTrades } from '@/app/lib/database/trades';

export const TradeList = async () => {
	const trades = await getTrades();

	if (!trades) {
		return null;
	}

	return <VStack gap={4} align="stretch" w="80%">
		{trades.map((trade) => (
			<Box key={trade._id.toString()}>
				<TradeCard trade={trade} />
			</Box>
		))}
	</VStack>;
};
