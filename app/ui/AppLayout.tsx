import { Box, Container } from '@chakra-ui/react';
import { Sidebar } from './Sidebar';
import { BottomTabBar } from '@/app/ui/BottomTabBar';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container maxW="container.xl" display="flex" h="100vh" flexDir={{ base: 'column', lg: 'row' }}>
			<Box hideBelow="lg" height="100%">
				<Sidebar />
			</Box>
			<Box flex="1" overflow="auto">
				{children}
			</Box>
			<Box hideFrom="lg" width="100%">
				<BottomTabBar />
			</Box>
		</Container>
	);
};
