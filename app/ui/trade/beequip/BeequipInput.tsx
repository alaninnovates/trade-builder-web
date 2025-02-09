import { HStack, VStack } from '@chakra-ui/react';
import { BeequipNumberInputCollection } from '@/app/ui/trade/beequip/BeequipNumberInputCollection';
import { BeequipBooleanInputCollection } from '@/app/ui/trade/beequip/BeequipBooleanInputCollection';
import { BeequipInputData } from '@/app/lib/types';
import { BeequipPotentialInput } from '@/app/ui/trade/beequip/BeequipPotentialInput';
import { BeequipWaxInput } from '@/app/ui/trade/beequip/BeequipWaxInput';

export const BeequipInput = ({ data, setData }: {
    data: BeequipInputData;
    setData: (data: BeequipInputData) => void;
}) => {
    return (
        <VStack>
            <BeequipPotentialInput potential={data.potential} setPotential={(potential) => {
                setData({
                    ...data,
                    potential,
                });
            }}/>
            <HStack gap={4}>
                <BeequipNumberInputCollection data={data.buffs} setData={(buffs) => {
                    setData({
                        ...data,
                        buffs,
                    });
                }}/>
                <BeequipNumberInputCollection data={data.debuffs} setData={(debuffs) => {
                    setData({
                        ...data,
                        debuffs,
                    });
                }}/>
                <BeequipNumberInputCollection data={data.bonuses} setData={(bonuses) => {
                    setData({
                        ...data,
                        bonuses,
                    });
                }}/>
                <BeequipBooleanInputCollection data={data.ability} setData={(ability) => {
                    setData({
                        ...data,
                        ability,
                    });
                }}/>
            </HStack>
            <BeequipWaxInput waxes={data.waxes} setWaxes={(waxes) => {
                setData({
                    ...data,
                    waxes,
                });
            }}/>
        </VStack>
    );
};
