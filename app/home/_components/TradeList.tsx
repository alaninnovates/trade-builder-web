import { Box, VStack } from '@chakra-ui/react';
import { TradeCard } from '@/app/ui/trade/TradeCard';
import { getTrades } from '@/app/lib/database/trades';
import { getBookmarkedTrades } from '@/app/lib/database/bookmarks';
import { getCurrentSession } from '@/app/lib/auth/session';

export const TradeList = async () => {
	const {user} = await getCurrentSession();
	const trades = await getTrades();

	if (!trades) {
		return null;
	}

	const bookmarks = await getBookmarkedTrades(user?.user_id as string) ?? [];
	console.log(bookmarks);

	return <VStack gap={4} align="stretch" w="80%">
		{trades.map((trade) => (
			<Box key={trade._id.toString()}>
				<TradeCard trade={{
					...trade,
					_id: trade._id.toString(),
				}} bookmarked={bookmarks.includes(trade._id.toString())} userId={user?.user_id} />
			</Box>
		))}
	</VStack>;
};
