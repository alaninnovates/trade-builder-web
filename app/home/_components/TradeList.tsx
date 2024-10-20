import { Box, VStack } from '@chakra-ui/react';
import client from '@/app/lib/db';
import { PostedTrade } from '@/app/lib/types';
import { TradeCard } from '@/app/ui/trade/TradeCard';

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

const getTrades = async () => {
	try {
		const mongoClient = await client.connect();
		const db = mongoClient.db('trade-builder');
		const trades = db.collection<PostedTrade>('posts');
		return await trades.find().sort({
			created_at: -1,
		}).limit(25).toArray();
	} catch (e) {
		console.error(e);
	}
};
