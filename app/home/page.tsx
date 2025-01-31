import { VStack } from '@chakra-ui/react';
import { SearchBar } from './_components/SearchBar';
import { TradeList } from './_components/TradeList';

const Page = () => {
	return (
		<VStack
			mt={6}
			w={{ base: '100%', lg: '80%', xl: '75%' }}
		>
			<SearchBar />
			<TradeList />
		</VStack>
	);
};

export default Page;
