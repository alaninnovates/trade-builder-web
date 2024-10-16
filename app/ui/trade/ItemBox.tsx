import { Box, Image, Text } from '@chakra-ui/react';

export const ItemBox = ({ item, quantity }: {
    item: string;
    quantity: number;
}) => {
    return (
        <Box w={16} h={16} rounded="lg" border="2px solid rgba(0, 0, 0, .5)" display="flex"
             alignItems="center" justifyContent="center" position="relative">
            <Image src={`/assets/stickers/${item}.png`} alt={item} w={8} h={8}/>
            <Text fontSize="xs" position="absolute" bottom={1} right={1}>x{quantity}</Text>
        </Box>
    );
};
