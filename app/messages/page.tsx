import { getMessages } from '@/app/lib/database/messaging';
import { Chat } from './_components/Chat';
import { getCurrentSession } from '@/app/lib/auth/session';

const Page = async () => {
	const messages = await getMessages();
	const {user} = await getCurrentSession();
	console.log(messages);

	if (!messages || !user) {
		return null;
	}

	return <Chat messages={messages} userId={user.user_id} userName={user.username} userGlobalName={user.global_name} userAvatar={user.image} />;
};

export default Page;
