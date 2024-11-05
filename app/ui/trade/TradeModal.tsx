'use client';
import {
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@chakra-ui/react';
import { TradeEditor } from '@/app/ui/trade/TradeEditor';
import React, { useState } from 'react';
import { Trade as TradeType } from '@/app/lib/types';
import { sendTradeOffer } from '@/app/lib/messaging';

export const TradeModal = ({ targetUser, trigger }: {
    targetUser: {
        user_id: string;
        user_name: string;
        user_avatar: string;
    };
    trigger: React.ReactNode;
}) => {
    const [trade, setTrade] = useState<TradeType>({
        offering: {},
        lookingFor: {},
    });
    return (
        <DialogRoot size="xl">
            <DialogBackdrop/>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Make an Offer</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <TradeEditor trade={trade} setTrade={setTrade}/>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={async () => {
                        await sendTradeOffer(targetUser, trade);
                    }}>Send Offer</Button>
                </DialogFooter>
                <DialogCloseTrigger/>
            </DialogContent>
        </DialogRoot>
    );
};
