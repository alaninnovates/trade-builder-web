import { ObjectId } from 'bson';

export interface Trade {
    lookingFor: {
        [key: string]: number;
    };
    offering: {
        [key: string]: number;
    };
}

export interface PostedTrade {
    _id: ObjectId;
    user_id: string;
    user_name: string;
    user_avatar: string;
    created_at: Date;
    expire_time: Date;
    server_sync: boolean;
    locked: boolean;
    trade: Trade;
}

export interface ChatMessage {
    _id: ObjectId;
    target: {
        user_id: string;
        user_name: string;
        user_avatar: string;
    };
    source: {
        user_id: string;
        user_name: string;
        user_avatar: string;
    };
    message: string;
    trade: Trade;
    created_at: Date;
}
