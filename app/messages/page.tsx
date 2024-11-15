import { getMessages } from '@/app/lib/messaging';
import { Chat } from './_components/Chat';

const Page = async () => {
	const messages = await getMessages();
	console.log(messages);

	if (!messages) {
		return null;
	}

	return <Chat messages={messages} />;
};

export default Page;
