import { ObjectId } from 'bson';

export interface PostedTrade {
    _id: ObjectId;
    user_id: string;
    expire_time: Date;
    server_sync: boolean;
    locked: boolean;
    trade: {
        lookingFor: {
            [key: string]: number;
        };
        offering: {
            [key: string]: number;
        };
    }
}
