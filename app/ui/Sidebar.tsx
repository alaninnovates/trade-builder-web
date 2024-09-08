'use client';

import { Image } from '@chakra-ui/next-js';
import { Box, Heading, HStack, VStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { FaHome, FaWrench } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';

const pages = [
	{
		name: 'Home',
		path: '/',
		icon: <FaHome size={25} />,
	},
	{
		name: 'Create',
		path: '/create',
		icon: <FaWrench size={25} />,
	},
	{
		name: 'Messages',
		path: '/messages',
		icon: <FaMessage size={25} />,
	},
];

// very similar to twitter navbar
export const Sidebar = () => {
	const pathname = usePathname();

	return (
		<nav>
			<VStack alignItems={'start'} spacing={0} p={4}>
				<Image
					src="/logo.png"
					alt="logo"
					height={50}
					width={50}
					mb={6}
				/>
				{pages.map((page) => (
					<Box key={page.path}>
						<a href={page.path}>
							<HStack
								spacing={4}
								p={4}
								bgColor={
									pathname === page.path
										? 'gray.200'
										: 'transparent'
								}
								borderRadius="md"
							>
								{page.icon}
								<Heading size="sm">{page.name}</Heading>
							</HStack>
						</a>
					</Box>
				))}
			</VStack>
		</nav>
	);
};
