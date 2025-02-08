import { beequipData, getBeequipData } from '@/app/lib/data/beequipData';
import { getStickerData, stickerData } from '@/app/lib/data/stickerData';

export const getItemImage = (item: string) => {
    return (getBeequipData(item) || getStickerData(item))?.image;
};

export const allData = {
    Beequips: beequipData,
    ...stickerData,
};
