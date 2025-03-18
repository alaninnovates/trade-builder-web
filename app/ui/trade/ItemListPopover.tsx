import React, { createContext, memo, useCallback, useMemo, useState } from 'react';
import { Box, Button, Grid, GridItem, Heading, Image } from '@chakra-ui/react';
import NextImage from 'next/image';
import { allData } from '@/app/lib/data/data';
import { BeequipDialog } from '@/app/ui/trade/beequip/BeequipDialog';
import { BeequipInputData } from '@/app/lib/types';
import {
    PopoverBody,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
} from '@/components/ui/popover';

const ItemListContext = createContext<{ onClick: (category: string, name: string) => void }>({ onClick: () => null });

const ItemList = memo(({ onClick }: { onClick: (category: string, name: string) => void }) => {
    return Object.entries(allData).map(([category, items]) => (
        <Box key={category} mb={4}>
            <Heading as="h2" size="md" mb={2}>{category}</Heading>
            <Grid overflowY="scroll" maxH="xl" gridTemplateColumns={{
                base: 'repeat(4, 1fr)',
                lg: 'repeat(6, 1fr)',
                xl: 'repeat(8, 1fr)',
            }} gap={2}>
                {Object.entries(items).map(([name, data]) => (
                    <GridItem key={name} display="flex" alignItems="center" mb={2}>
                        <Button onClick={() => onClick(category, name)} w="100%" p={0} variant="ghost" h="100%">
                            <Image mr={2} width="100%" asChild>
                                <NextImage src={'/' + data.image} alt={name} priority width={20} height={20} />
                            </Image>
                        </Button>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    ));
});

export const ItemListPopover = memo(({ trigger, onItemSelect, side }: {
    trigger: React.ReactNode;
    onItemSelect: (item: string, data: BeequipInputData | null) => void;
    side?: 'left' | 'right';
}) => {
    const [open, setOpen] = useState(false);
    const [beequipDialogOpen, setBeequipDialogOpen] = useState(false);
    const [currentBeequip, setCurrentBeequip] = useState<string | null>(null);

    const onClick = useCallback((category: string, name: string) => {
        if (category === 'Beequips') {
            setCurrentBeequip(name);
            setBeequipDialogOpen(true);
        } else {
            onItemSelect(name, null);
        }
    }, []);

    const contextValue = useMemo(() => ({ onClick }), [onClick]);

    return (
        <ItemListContext.Provider value={contextValue}>
            <PopoverRoot
                positioning={{ placement: side === 'left' ? 'bottom-start' : 'bottom-end' }}
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
            >
                <PopoverTrigger asChild>{trigger}</PopoverTrigger>
                <PopoverContent minW={{ base: '100%', lg: 'xl' }} h="30vh" overflowY="scroll" portalled={false}>
                    <PopoverHeader>
                        <PopoverTitle>Choose an item</PopoverTitle>
                        <PopoverCloseTrigger />
                    </PopoverHeader>
                    <PopoverBody>
                        <ItemList onClick={onClick} />
                    </PopoverBody>
                </PopoverContent>
            </PopoverRoot>
            <BeequipDialog
                open={beequipDialogOpen}
                setOpen={setBeequipDialogOpen}
                currentBeequip={currentBeequip}
                onSubmit={(data: BeequipInputData) => {
                    onItemSelect(currentBeequip as string, data);
                }}
            />
        </ItemListContext.Provider>
    );
});
