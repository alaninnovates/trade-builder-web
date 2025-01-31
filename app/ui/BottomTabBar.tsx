import { HStack, Image } from '@chakra-ui/react';
import { TabBarPages } from '@/app/ui/TabBarPages';
import { UserPill } from '@/app/ui/UserPill';

export const BottomTabBar = () => {
    return (
        <nav style={{ width: '100%' }}>
            <HStack justifyContent={'space-between'} alignItems={'center'} p={4} gap={0} w="100%">
                <Image
                    src="/logo.png"
                    alt="logo"
                    height={50}
                    width={50}
                    mx={6}
                />
                <TabBarPages />
                <UserPill />
            </HStack>
        </nav>
    );
};
