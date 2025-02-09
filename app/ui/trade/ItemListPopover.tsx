import {
    PopoverBody,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
} from '@/components/ui/popover';
import React, { useState } from 'react';
import { Box, Button, Grid, GridItem, Heading, Image } from '@chakra-ui/react';
import { allData } from '@/app/lib/data/data';
import { BeequipDialog } from '@/app/ui/trade/beequip/BeequipDialog';

import { BeequipInputData } from '@/app/lib/types';

export const ItemListPopover = ({ trigger, onItemSelect, side }: {
    trigger: React.ReactNode;
    onItemSelect: (item: string, data: BeequipInputData | null) => void;
    side?: 'left' | 'right';
}) => {
    const [open, setOpen] = useState(false);

    return (
        <PopoverRoot positioning={{ placement: side === 'left' ? 'bottom-start' : 'bottom-end' }} open={open} onOpenChange={(e) => setOpen(e.open)}>
            <PopoverTrigger asChild>
                {trigger}
            </PopoverTrigger>
            <PopoverContent minW={{ base: '100%', lg: 'xl' }} h="30vh" overflowY="scroll" portalled={false}>
                <PopoverHeader>
                    <PopoverTitle>Choose an item</PopoverTitle>
                    <PopoverCloseTrigger/>
                </PopoverHeader>
                <PopoverBody>
                    {Object.entries(allData).map(([category, items]) => (
                        <Box key={category} mb={4}>
                            <Heading as="h2" size="md" mb={2}>{category}</Heading>
                            <Grid overflowY="scroll" maxH="xl" gridTemplateColumns={{
                                base: 'repeat(4, 1fr)',
                                lg: 'repeat(6, 1fr)',
                                xl: 'repeat(8, 1fr)',
                            }} gap={2}>
                                {Object.entries(items).map(([name, data]) => (
                                    <GridItem key={name} display="flex" alignItems="center" mb={2}>
                                        {category === 'Beequips' ? (
                                            <BeequipDialog
                                                beequip={name}
                                                trigger={
                                                    <Button onClick={() => {
                                                        setOpen(false);
                                                    }} w="100%" p={0} variant="ghost" h="100%">
                                                        <Image src={data.image} alt={name} mr={2} width="100%"/>
                                                    </Button>
                                                }
                                                onSubmit={(data: BeequipInputData) => {
                                                    onItemSelect(name, data);
                                                }}
                                            />
                                        ) : (
                                            <Button onClick={() => {
                                                onItemSelect(name, null);
                                            }} w="100%" p={0} variant="ghost" h="100%">
                                                <Image src={data.image} alt={name} mr={2} width="100%"/>
                                            </Button>
                                        )}
                                    </GridItem>
                                ))}
                            </Grid>
                        </Box>
                    ))}
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot>
    );
};
