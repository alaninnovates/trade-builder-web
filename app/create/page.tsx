'use client';
import { TradeEditor } from '@/app/ui/trade/TradeEditor';
import { useState } from 'react';
import { Trade as TradeType } from '@/app/lib/types';

const Page = () => {
    const [trade, setTrade] = useState<TradeType>({
        offering: {},
        lookingFor: {},
    });
    return (
        <TradeEditor trade={trade} setTrade={setTrade}/>
    );
};

export default Page;
