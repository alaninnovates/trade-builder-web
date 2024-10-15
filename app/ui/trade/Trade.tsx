import { PostedTrade } from '@/app/lib/types';

export const Trade = ({trade}: {trade: PostedTrade}) => {
    return <div>{JSON.stringify(trade)}</div>
};
