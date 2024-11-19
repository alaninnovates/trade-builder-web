'use client';
import { Box, Heading, HStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { GoHome, GoInbox, GoTools } from 'react-icons/go';

const pages = [
    {
        name: 'Home',
        path: '/home',
        icon: <GoHome size={25}/>,
    },
    {
        name: 'Create',
        path: '/create',
        icon: <GoTools size={25}/>,
    },
    {
        name: 'Messages',
        path: '/messages',
        icon: <GoInbox size={25}/>,
    },
];

export const SidebarPages = () => {
    const pathname = usePathname();

    return (
        <>
            {pages.map((page) => (
                <Box key={page.path}>
                    <a href={page.path}>
                        <HStack
                            gap={4}
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
        </>
    );
};
