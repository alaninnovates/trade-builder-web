import {
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from '@/components/ui/dialog';
import { getBeequipInputDefaults } from '@/app/lib/data/beequipData';
import { useEffect, useState } from 'react';
import { Button, Code } from '@chakra-ui/react';
import { BeequipInput } from '@/app/ui/trade/beequip/BeequipInput';
import { BeequipInputData } from '@/app/lib/types';

export const BeequipDialog = ({ open, setOpen, currentBeequip, onSubmit }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    currentBeequip: string | null;
    onSubmit: (data: BeequipInputData) => void;
}) => {
    const [data, setData] = useState<BeequipInputData | null>();

    useEffect(() => {
        if (currentBeequip) {
            setData(getBeequipInputDefaults(currentBeequip));
        }
    }, [currentBeequip]);

    if (!data) {
        return null;
    }

    return (
        <DialogRoot placement="center" size="lg" open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogBackdrop />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit <Code size="lg">{currentBeequip}</Code></DialogTitle>
                    <DialogCloseTrigger/>
                </DialogHeader>
                <DialogBody>
                    <BeequipInput data={data} setData={setData}/>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={() => {
                        setOpen(false);
                        onSubmit(data);
                    }}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};
