import { TradeCard } from '@/app/ui/trade/TradeCard';
import { auth, signIn } from '@/app/lib/auth';
import { Button, Center } from '@chakra-ui/react';
import { getTrade } from '@/app/lib/database/trades';
import { isTradeBookmarked } from '@/app/lib/database/bookmarks';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = await auth();
    const trade = await getTrade(id);
    if (!trade) {
        return <div>Trade not found</div>;
    }
    const bookmarked = await isTradeBookmarked(session?.user?.id as string, id) || false;

    return (
        <Center flexDir="column" gap={4} height="100%">
            <TradeCard trade={{
                ...trade,
                _id: trade._id.toString(),
            }} bookmarked={bookmarked} userId={session?.user?.id} />
            {(!session || !session.user) && (
                <form
                    action={async () => {
                        'use server';
                        await signIn('discord', { redirectTo: `/trade/${id}` });
                    }}
                >
                    <Button type="submit">Sign in to send offer</Button>
                </form>
            )}
        </Center>
    );
};


export default Page;
