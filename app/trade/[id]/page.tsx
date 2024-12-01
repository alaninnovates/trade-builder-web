import { TradeCard } from '@/app/ui/trade/TradeCard';
import client from '@/app/lib/db';
import { PostedTrade } from '@/app/lib/types';
import { ObjectId } from 'bson';
import { auth, signIn } from '@/app/lib/auth';
import { Button, Center } from '@chakra-ui/react';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = await auth();
    const trade = await getTrade(id);
    if (!trade) {
        return <div>Trade not found</div>;
    }
    return (
        <Center flexDir="column" gap={4} height="100%">
            <TradeCard trade={trade}/>
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

const getTrade = async (id: string) => {
    try {
        const mongoClient = await client.connect();
        const db = mongoClient.db('trade-builder');
        const trades = db.collection<PostedTrade>('posts');
        return await trades.findOne({ _id: new ObjectId(id) });
    } catch (e) {
        console.error(e);
    }
};


export default Page;
