import { getMessages } from '@/app/lib/messaging';
import { Chat } from './_components/Chat';

const Page = async () => {
	const messages = await getMessages();

	if (!messages) {
		return null;
	}

	console.log(messages);

	return <Chat messages={messages} />;
};

export default Page;
