'use client';
import {
    DialogBackdrop,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button, Dialog, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { sendMessage } from '@/app/lib/database/messaging';
import { ChatMessageUser } from '@/app/lib/types';

export const MessageModal = ({
                                 targetUser,
                                 trigger,
                             }: {
    targetUser: ChatMessageUser;
    trigger: React.ReactNode;
}) => {
    const [message, setMessage] = useState('');
    return (
        <DialogRoot size="xl">
            <DialogBackdrop/>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send a Message</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </DialogBody>
                <DialogFooter>
                    <Dialog.CloseTrigger>
                        <Button
                            onClick={async () => {
                                await sendMessage(targetUser, message);
                            }}>Send Message</Button>
                    </Dialog.CloseTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};
