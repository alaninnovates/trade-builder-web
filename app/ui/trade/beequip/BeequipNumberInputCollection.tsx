import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input';
import { VStack } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';

export const BeequipNumberInputCollection = ({ data, setData }: {
    data: Record<string, number>;
    setData: (data: Record<string, number>) => void;
}) => {
    return (
        <VStack gap={2}>
            {Object.entries(data).map(([key, value]) => (
                <Field key={key} label={key}>
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
