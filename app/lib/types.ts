import { ObjectId } from 'bson';

export type WaxType = "Soft Wax" | "Hard Wax" | "Caustic Wax" | "Swirled Wax";

export interface BeequipInputData {
	buffs: Record<string, number>;
	debuffs: Record<string, number>;
	ability: Record<string, boolean>;
	bonuses: Record<string, number>;
	potential: number;
	waxes: WaxType[];
}

export interface Trade {
	lookingFor: {
		[key: string]: number | BeequipInputData;
	};
	offering: {
		[key: string]: number | BeequipInputData;
	};
}

export interface PostedTrade {
	_id: ObjectId;
	user_id: string;
	user_name: string;
	user_global_name: string | null;
	user_avatar: string;
	created_at: Date;
	expire_time: Date;
	server_sync: boolean;
	locked: boolean;
	trade: Trade;
}

export type PostedTradeWithStringId = Omit<PostedTrade, "_id"> & { _id: string };

export interface ChatMessageUser {
	user_id: string;
	user_name: string;
	user_global_name: string | null;
	user_avatar: string;
}

export interface ChatMessage {
	_id: ObjectId;
	target: ChatMessageUser;
	source: ChatMessageUser;
	message: string;
	trade?: Trade;
	created_at: Date;
}

export interface AggregatedConversation {
	user_id: string;
	user_name: string;
	user_global_name: string | null;
	user_avatar: string;
	messages: ChatMessage[];
}

export interface Session {
	id: string;
	user_id: string;
	expires_at: Date;
}

export interface User {
	user_id: string;
	premium_level: number;
	premium_since: Date;
	bookmarks: string[];
	global_name: string | null;
	username: string;
	email: string;
	image: string;
}
