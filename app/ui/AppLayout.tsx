import { Box, Container } from '@chakra-ui/react';
import { Sidebar } from './Sidebar';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container maxW="container.xl" display="flex" h="100vh">
			<Sidebar />
			<Box flex="1" overflow="auto">
				{children}
			</Box>
		</Container>
	);
};
