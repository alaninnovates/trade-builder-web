import { TradeCard } from '@/app/ui/trade/TradeCard';
import { Button, Center } from '@chakra-ui/react';
import { getTrade } from '@/app/lib/database/trades';
import { isTradeBookmarked } from '@/app/lib/database/bookmarks';
import { getCurrentSession } from '@/app/lib/auth/session';
import { redirect } from 'next/navigation';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const { user } = await getCurrentSession();
    const trade = await getTrade(id);
    if (!trade) {
        return <div>Trade not found</div>;
    }
    const bookmarked = await isTradeBookmarked(user?.user_id as string, id) || false;

    return (
        <Center flexDir="column" gap={4} height="100%">
            <TradeCard trade={{
                ...trade,
                _id: trade._id.toString(),
            }} bookmarked={bookmarked} userId={user?.user_id} />
            {(!user) && (
                <form
                    action={async () => {
                        'use server';
                        // todo: add redirect to parameter
                        redirect('/login/discord');
                    }}
                >
                    <Button type="submit">Sign in to send offer</Button>
                </form>
            )}
        </Center>
    );
};


export default Page;
