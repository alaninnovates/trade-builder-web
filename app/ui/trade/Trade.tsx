import { PostedTrade } from '@/app/lib/types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Box, Flex, Grid, Icon, Text } from '@chakra-ui/react';
import { ItemBox } from '@/app/ui/trade/ItemBox';
import { fonts } from '@/app/fonts';

export const Trade = ({ trade }: { trade: PostedTrade }) => {
    return (
        <Box w="100%" maxW="3xl" bg="#FEC200" rounded="xl" mt={4} className={fonts.buycat.className}>
            <Box py={6} position="relative">
                <Flex position="absolute" top={0} left={0} right={0} justifyContent="space-between">
                    <Text fontSize="xl" fontWeight="bold" color="white" bg="#8ABF6B" px={4} py={2} rounded="md"
                          border="1px solid black" position="absolute" top="-10px" left="-10px"
                          transform="rotate(-6deg)">
                        Offering
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" color="white" bg="red.400" px={4} py={2} rounded="md"
                          border="1px solid black" position="absolute" top="-10px" right="-10px"
                          transform="rotate(6deg)">
                        Looking For
                    </Text>
                </Flex>
            </Box>
            <Flex p={4} gap={4}>
                <Grid flex={1} bg="#FEBC2B" rounded="lg" p={4} border="2px solid black"
                      gridTemplateColumns="1fr 1fr 1fr" gap={4}>
                    {Object.entries(trade.trade.offering).map(([item, quantity]) => (
                        <ItemBox key={item} item={item} quantity={quantity}/>
                    ))}
                </Grid>
                <Flex flexDir="column" alignItems="center" justifyContent="center" gap={2}>
                    <Icon asChild width={12} height={12} color="green.500">
                        <FaArrowLeft width="100%" height="100%"/>
                    </Icon>
                    <Icon asChild width={12} height={12} color="red.500">
                        <FaArrowRight width="100%" height="100%"/>
                    </Icon>
                </Flex>
                <Grid flex={1} bg="#FEBC2B" rounded="lg" p={4} border="2px solid black"
                      gridTemplateColumns="1fr 1fr 1fr" gap={4}>
                    {Object.entries(trade.trade.lookingFor).map(([item, quantity]) => (
                        <ItemBox key={item} item={item} quantity={quantity}/>
                    ))}
                </Grid>
            </Flex>
        </Box>
    );
};
