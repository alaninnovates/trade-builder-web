import { VStack } from '@chakra-ui/react';
import { Checkbox } from '@/components/ui/checkbox';

export const BeequipBooleanInputCollection = ({ data, setData }: {
    data: Record<string, boolean>;
    setData: (data: Record<string, boolean>) => void;
}) => {
    return (
        <VStack gap={2} align="start">
            {Object.entries(data).map(([key, value]) => (
                <Checkbox key={key} checked={value} onCheckedChange={(checked) => {
                    setData({
                        ...data,
                        [key]: !!checked.checked,
                    });
                }}>
                    {key}
                </Checkbox>
            ))}
        </VStack>
    );
};
