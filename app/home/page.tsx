import { VStack } from '@chakra-ui/react';
import { SearchBar } from './_components/SearchBar';
import { TradeList } from './_components/TradeList';

const Page = () => {
	return (
		<VStack
			mt={6}
			w={{
				// not too big on small devices, but 100% width on larger devices
				base: '100%',
				md: '75%',
			}}
		>
			<SearchBar />
			<TradeList />
		</VStack>
	);
};

export default Page;
