'use client';

import { ChakraProvider, defaultSystem, Theme } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import React from 'react';

export const Providers = (props: { children: React.ReactNode }) => {
    return (
        <ChakraProvider value={defaultSystem}>
            <ThemeProvider attribute="class" disableTransitionOnChange>
                <Theme appearance="light" colorScheme="teal">
                    {props.children}
                </Theme>
            </ThemeProvider>
        </ChakraProvider>
    );
}
