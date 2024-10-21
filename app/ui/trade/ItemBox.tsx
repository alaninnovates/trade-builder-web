import { Box, Float, Image, Show, Text } from '@chakra-ui/react';
import { CloseButton } from '@/components/ui/close-button';

export const ItemBox = ({ item, quantity, editable, onRemove }: {
    item: string;
    quantity: number;
    editable: boolean;
    onRemove: () => void;
}) => {
    return (
        <Box w={16} h={16} rounded="lg" border="2px solid rgba(0, 0, 0, .5)" display="flex"
             alignItems="center" justifyContent="center" position="relative">
            <Show when={editable}>
                <Float>
                    <CloseButton onClick={onRemove} colorPalette="red" variant="solid" rounded="4xl" size="xs"/>
                </Float>
            </Show>
            <Image src={`/assets/stickers/${item}.png`} alt={item} w={8} h={8}/>
            <Text fontSize="xs" position="absolute" bottom={1} right={1}>x{quantity}</Text>
        </Box>
    );
};
