'use server';
import {
	AggregatedConversation,
	ChatMessage,
	Trade as TradeType,
} from '@/app/lib/types';
import { auth } from '@/app/lib/auth';
import client from '@/app/lib/db';

interface User {
	user_id: string;
	user_name: string;
	user_avatar: string;
}

export const sendTradeOffer = async (targetUser: User, trade: TradeType) => {
	const authUser = await auth();

	if (!authUser || !authUser.user) {
		return;
	}

	try {
		const mongoClient = await client.connect();
		const db = mongoClient.db('trade-builder');
		const messages = db.collection<Omit<ChatMessage, '_id'>>('messages');
		return await messages.insertOne({
			target: targetUser,
			source: {
				user_id: authUser.user.id!,
				user_name: authUser.user.name!,
				user_avatar: authUser.user.image!,
			},
			message: '',
			trade,
			created_at: new Date(),
		});
	} catch (e) {
		console.error(e);
	}
};

export const sendMessage = async (targetUser: User, message: string) => {
	const authUser = await auth();

	if (!authUser || !authUser.user) {
		return;
	}

	try {
		const mongoClient = await client.connect();
		const db = mongoClient.db('trade-builder');
		const messages = db.collection<Omit<ChatMessage, '_id'>>('messages');
		return await messages.insertOne({
			target: targetUser,
			source: {
				user_id: authUser.user.id!,
				user_name: authUser.user.name!,
				user_avatar: authUser.user.image!,
			},
			message,
			created_at: new Date(),
		});
	} catch (e) {
		console.error(e);
	}
};

export const getMessages = async () => {
	const session = await auth();
	if (!session || !session.user) return undefined;
	const userId = session.user.id!;

	try {
		const mongoClient = await client.connect();
		const db = mongoClient.db('trade-builder');
		const messages = db.collection<ChatMessage>('messages');
		return (
			await messages
				.aggregate([
					{
						$sort: { created_at: 1 },
					},
					{
						$group: {
							_id: {
								user_1: {
									$cond: {
										if: {
											$lt: [
												'$source.user_id',
												'$target.user_id',
											],
										},
										then: '$source.user_id',
										else: '$target.user_id',
									},
								},
								user_2: {
									$cond: {
										if: {
											$lt: [
												'$source.user_id',
												'$target.user_id',
											],
										},
										then: '$target.user_id',
										else: '$source.user_id',
									},
								},
							},
							messages: {
								$push: {
									_id: '$_id',
									target: '$target',
									source: '$source',
									message: '$message',
									created_at: '$created_at',
									trade: '$trade',
								},
							},
						},
					},
					{
						$match: {
							$or: [
								{
									'_id.user_1': userId,
								},
								{
									'_id.user_2': userId,
								},
							],
						},
					},
					{
						$project: {
							messages: 1,
							user_id: {
								$cond: {
									if: {
										$eq: ['$_id.user_1', userId],
									},
									then: '$_id.user_2',
									else: '$_id.user_1',
								},
							},
						},
					},
				])
				.toArray()
		).map((convo) => ({
			user_id: convo.user_id,
			user_name:
				convo.messages.find(
					(m: { source: { user_id: string } }) =>
						m.source.user_id !== userId,
				)?.source.user_name ?? convo.messages[0].target.user_name,
			user_avatar:
				convo.messages.find(
					(m: { source: { user_id: string } }) =>
						m.source.user_id !== userId,
				)?.source.user_avatar ?? convo.messages[0].target.user_avatar,
			messages: convo.messages.map(
				(m: {
					target: any;
					source: any;
					message: any;
					trade: any;
					created_at: any;
				}) =>
					({
						target: m.target,
						source: m.source,
						message: m.message,
						trade: m.trade,
						created_at: m.created_at,
					} as ChatMessage),
			),
		})) as AggregatedConversation[];
	} catch (e) {
		console.error(e);
	}
};
