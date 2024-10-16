import { VStack } from '@chakra-ui/react';
import client from '@/app/lib/db';
import { PostedTrade } from '@/app/lib/types';
import { Trade } from '@/app/ui/trade/Trade';

export const TradeList = async () => {
	const trades = await getTrades();

	if (!trades) {
		return null;
	}

	return <VStack gap={4} align="stretch" w="80%">
		{trades.map((trade) => (
			<div key={trade._id.toString()}>
				<Trade trade={trade} />
			</div>
		))}
	</VStack>;
};

const getTrades = async () => {
	try {
		const mongoClient = await client.connect();
		const db = mongoClient.db('trade-builder');
		const trades = db.collection<PostedTrade>('posts');
		return await trades.find().toArray();
	} catch (e) {
		console.error(e);
	}
};
