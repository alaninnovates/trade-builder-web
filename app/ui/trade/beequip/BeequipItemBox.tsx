import { Box, Float, HStack, Image, Show, Text, VStack } from '@chakra-ui/react';
import { CloseButton } from '@/components/ui/close-button';
import { getItemImage } from '@/app/lib/data/data';
import { BeequipInputData } from '@/app/lib/types';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { waxData } from '@/app/lib/data/waxData';

export const BeequipItemBox = ({ item, data, editable, onRemove }: {
    item: string;
    data: BeequipInputData;
    editable: boolean;
    onRemove: () => void;
}) => {
    return (
        <Box w={48} rounded="lg" border="2px solid rgba(0, 0, 0, .5)" p={4} position="relative" display="flex"
             flexDir="column" alignItems="center" justifyContent="center" gap={4}>
            <Show when={editable}>
                <Float>
                    <CloseButton onClick={onRemove} colorPalette="red" variant="solid" rounded="4xl" size="xs"/>
                </Float>
            </Show>
            <Image src={'/' + getItemImage(item)} alt={item} w={8} h={8}/>
            <HStack>
                {new Array(data.potential).fill(0).map((_, i) => (
                    <FaStar key={i}/>
                ))}
                {new Array(5 - data.potential).fill(0).map((_, i) => (
                    <FaRegStar key={i}/>
                ))}
            </HStack>
            <VStack gap={0} alignItems="start">
                {Object.entries(data.buffs).map(([buff, val]) => val > 0 && (
                    <Text key={buff} fontSize="xs">{val}{buff}</Text>
                ))}
                {Object.entries(data.debuffs).map(([debuff, val]) => val > 0 && (
                    <Text key={debuff} fontSize="xs">{val}{debuff}</Text>
                ))}
                {Object.entries(data.ability).map(([ability, val]) => val && (
                    <Text key={ability} fontSize="xs">{ability}</Text>
                ))}
                {Object.entries(data.bonuses).map(([bonus, val]) => val > 0 && (
                    <Text key={bonus} fontSize="xs">{val}{bonus}</Text>
                ))}
            </VStack>
            <HStack>
                {data.waxes.map((wax, i) => (
                    <Image key={i} src={'/' + waxData[wax].image} alt={wax} w={8} h={8}/>
                ))}
            </HStack>
        </Box>
    );
};
