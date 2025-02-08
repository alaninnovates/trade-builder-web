import { getBeequipData } from '@/app/lib/data/beequipData';
import { getStickerData } from '@/app/lib/data/stickerData';

export const getItemImage = (item: string) => {
    return (getBeequipData(item) || getStickerData(item))?.image;
};
