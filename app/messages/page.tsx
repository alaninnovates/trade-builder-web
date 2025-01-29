import { getMessages } from '@/app/lib/database/messaging';
import { Chat } from './_components/Chat';
import { auth } from '@/app/lib/auth';

const Page = async () => {
	const messages = await getMessages();
	const session = await auth();
	console.log(messages);

	if (!messages || !session || !session.user) {
		return null;
	}

	return <Chat messages={messages} userId={session.user.id!} userName={session.user.name!} userAvatar={session.user.image!} />;
};

export default Page;
