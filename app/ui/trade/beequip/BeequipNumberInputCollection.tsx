import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input';
import { VStack } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';

export const BeequipNumberInputCollection = ({ data, setData, color }: {
    data: Record<string, number>;
    setData: (data: Record<string, number>) => void;
    color?: string;
}) => {
    return (
        <VStack gap={2}>
            {Object.entries(data).map(([key, value]) => (
                <Field key={key} label={key} color={color}>
                    <NumberInputRoot value={value.toString()} onValueChange={(value) => {
                        setData({
                            ...data,
                            [key]: value.valueAsNumber,
                        });
                    }}>
                        <NumberInputField/>
                    </NumberInputRoot>
                </Field>
            ))}
        </VStack>
    );
};
