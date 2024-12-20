import { stickerData } from '@/app/lib/stickerData';
import {
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import { Box, Button, Grid, GridItem, Heading, Image, Dialog } from '@chakra-ui/react';


export const ItemListDialog = ({ trigger, onItemSelect }: {
    trigger: React.ReactNode;
    onItemSelect: (item: string) => void;
}) => {
    return (
        <DialogRoot size="xl">
            <DialogBackdrop/>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Choose an item</DialogTitle>
                    <DialogCloseTrigger/>
                </DialogHeader>
                <DialogBody>
                    {Object.entries(stickerData).map(([category, stickers]) => (
                        <Box key={category} mb={4}>
                            <Heading as="h2" size="md" mb={2}>{category}</Heading>
                            <Grid overflowY="scroll" maxH="xl" gridTemplateColumns="repeat(8, 1fr)" gap={2}>
                                {Object.entries(stickers).map(([name, path]) => (
                                    <GridItem key={name} display="flex" alignItems="center" mb={2}>
                                        <Button onClick={() => {
                                            onItemSelect(name);
                                        }} w="100%" p={0} variant="ghost" h="100%">
                                            <Image src={path} alt={name} mr={2} width="100%"/>
                                        </Button>
                                    </GridItem>
                                ))}
                            </Grid>
                        </Box>
                    ))}
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    );
};
