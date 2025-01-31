import { getCurrentSession } from '@/app/lib/auth/session';
import { TradeCreator } from '@/app/create/_components/TradeCreator';

const Page = async () => {
    const {user} = await getCurrentSession();

    return (
        <TradeCreator user={user} />
    );
};

export default Page;
