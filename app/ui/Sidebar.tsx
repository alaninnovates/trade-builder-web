import { Image, Spacer, VStack } from '@chakra-ui/react';
import { UserPill } from '@/app/ui/UserPill';
import { SidebarPages } from '@/app/ui/SidebarPages';

export const Sidebar = () => {
	return (
		<nav style={{ height: '100%' }}>
			<VStack alignItems={'start'} p={4} gap={0} h="100%">
				<Image
					src="/logo.png"
					alt="logo"
					height={50}
					width={50}
					mb={6}
				/>
				<SidebarPages />
				<Spacer />
				<UserPill />
			</VStack>
		</nav>
	);
};
