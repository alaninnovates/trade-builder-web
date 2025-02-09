import { WaxType } from '@/app/lib/types';

export const waxData = {
    'Soft Wax': {
        image: 'assets/waxes/Soft Wax.png',
    },
    'Hard Wax': {
        image: 'assets/waxes/Hard Wax.png',
    },
    'Caustic Wax': {
        image: 'assets/waxes/Caustic Wax.png',
    },
    'Swirled Wax': {
        image: 'assets/waxes/Swirled Wax.png',
    },
} as Record<WaxType, WaxData>;

interface WaxData {
    image: string;
}
