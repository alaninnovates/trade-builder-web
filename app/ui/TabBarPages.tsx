'use client';
import { Box, HStack } from '@chakra-ui/react';
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

export const TabBarPages = () => {
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
                        </HStack>
                    </a>
                </Box>
            ))}
        </>
    );
};
