import { Box, VStack } from '@chakra-ui/react';
import { TradeCard } from '@/app/ui/trade/TradeCard';
import { getTrades } from '@/app/lib/database/trades';
import { getBookmarkedTrades } from '@/app/lib/database/bookmarks';
import { auth } from '@/app/lib/auth';

export const TradeList = async () => {
	const session = await auth();
	const trades = await getTrades();

	if (!trades) {
		return null;
	}

	const bookmarks = await getBookmarkedTrades(session?.user?.id as string) ?? [];
	console.log(bookmarks);

	return <VStack gap={4} align="stretch" w="80%">
		{trades.map((trade) => (
			<Box key={trade._id.toString()}>
				<TradeCard trade={{
					...trade,
					_id: trade._id.toString(),
				}} bookmarked={bookmarks.includes(trade._id.toString())} userId={session?.user?.id} />
			</Box>
		))}
	</VStack>;
};
