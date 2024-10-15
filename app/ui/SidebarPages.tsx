'use client';
import { Box, Heading, HStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { FaHome, FaWrench } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';

const pages = [
    {
        name: 'Home',
        path: '/home',
        icon: <FaHome size={25}/>,
    },
    {
        name: 'Create',
        path: '/create',
        icon: <FaWrench size={25}/>,
    },
    {
        name: 'Messages',
        path: '/messages',
        icon: <FaMessage size={25}/>,
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
