import {
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { getBeequipInputDefaults } from '@/app/lib/data/beequipData';
import { useState } from 'react';
import { Button, Code } from '@chakra-ui/react';
import { BeequipInput } from '@/app/ui/trade/beequip/BeequipInput';
import { BeequipInputData } from '@/app/lib/types';

export const BeequipDialog = ({ beequip, trigger, onSubmit }: {
    beequip: string;
    trigger: React.ReactNode;
    onSubmit: (data: BeequipInputData) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<BeequipInputData>(getBeequipInputDefaults(beequip));

    return (
        <DialogRoot placement="center" size="lg" open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogBackdrop />
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit <Code size="lg">{beequip}</Code></DialogTitle>
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
