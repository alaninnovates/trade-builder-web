import { Box, HStack, Image, VStack } from '@chakra-ui/react';
import { waxData } from '@/app/lib/data/waxData';
import { WaxType } from '@/app/lib/types';

export const BeequipWaxInput = ({ waxes, setWaxes }: {
    waxes: WaxType[];
    setWaxes: (waxes: WaxType[]) => void;
}) => {
    return (
        <VStack>
            <HStack gap={1}>
                {waxes.map((wax, i) => (
                    <Box key={i} bg="gray.200" borderRadius="sm" p={2}>
                        <Image src={'/' + waxData[wax].image} alt={wax} w={8} h={8}/>
                    </Box>
                ))}
                {new Array(5 - waxes.length).fill(0).map((_, i) => (
                    <Box key={i} bg="gray.200" borderRadius="sm" p={2}>
                        <Box w={8} h={8}/>
                    </Box>
                ))}
            </HStack>
            <HStack gap={1}>
                {(Object.keys(waxData) as WaxType[]).map((wax, i) => (
                    <Box key={i}
                         onClick={() => {
                             if (waxes.includes(wax)) {
                                 setWaxes(waxes.filter((w) => w !== wax));
                             } else {
                                 setWaxes([...waxes, wax]);
                             }
                         }}>
                        <Image src={'/' + waxData[wax].image} alt={wax} w={8} h={8}/>
                    </Box>
                ))}
            </HStack>
        </VStack>
    );
};
