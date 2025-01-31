"use client";
import { useState } from 'react';
import { Trade as TradeType, User } from '@/app/lib/types';
import { Box, Button, Text } from '@chakra-ui/react';
import { TradeEditor } from '@/app/ui/trade/TradeEditor';
import { postTrade } from '@/app/lib/database/trades';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export const TradeCreator = ({ user }: { user: User | null }) => {
    const router = useRouter();
    const [trade, setTrade] = useState<TradeType>({
        offering: {},
        lookingFor: {},
    });
    const [expireTime, setExpireTime] = useState<Date>(new Date());
    const [loading, setLoading] = useState(false);

    return (
        <Box height="100%" display="flex" flexDirection="column" gap={4} alignItems="center" justifyContent="center">
            <TradeEditor trade={trade} setTrade={setTrade} width="100%" height="auto"/>
            {user && (
                <Box display="flex" flexDirection="column" gap={4} alignItems="center" mt={10}>
                    <Box display="flex" flexDirection="row" gap={4}>
                        <Text>Trade expire time:</Text>
                        <DatePicker
                            showTimeSelect
                            selected={expireTime}
                            onChange={(date) => setExpireTime(date ?? new Date())}
                        />
                    </Box>
                    <Button onClick={async () => {
                        setLoading(true);
                        postTrade(trade, user, expireTime).then((id) => {
                            console.log('id', id);
                            if (!id) {
                                setLoading(false);
                                return;
                            }
                            setTrade({
                                offering: {},
                                lookingFor: {},
                            });
                            router.push(`/trade/${id}`);
                            setLoading(false);
                        });
                    }} loading={loading} loadingText="Posting...">
                        Post Trade
                        <FaArrowRight/>
                    </Button>
                </Box>
            )}
        </Box>
    );
};
