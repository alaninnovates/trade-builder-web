import { Box, HStack } from '@chakra-ui/react';
import { FaRegStar, FaStar } from 'react-icons/fa';

export const BeequipPotentialInput = ({ potential, setPotential }: {
    potential: number;
    setPotential: (potential: number) => void;
}) => {
    return (
        <HStack gap={1}>
            {new Array(5).fill(0).map((_, i) => (
                <Box key={i} onClick={() => setPotential(i + 1)}>
                    {i < potential ? <FaStar size={24}/> : <FaRegStar size={24}/>}
                </Box>
            ))}
        </HStack>
    );
};
