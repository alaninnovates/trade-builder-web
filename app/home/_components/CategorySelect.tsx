import { createListCollection } from '@chakra-ui/react';
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from '@/components/ui/select';


export const CategorySelect = () => {
    return (
        <SelectRoot collection={categories} size="sm" width="320px" multiple={true}>
            <SelectTrigger>
                <SelectValueText placeholder="Select category"/>
            </SelectTrigger>
            <SelectContent>
                {categories.items.map((category) => (
                    <SelectItem item={category} key={category.value}>
                        {category.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
};

const categories = createListCollection({
    items: [
        { value: 'sticker', label: 'Sticker' },
        {
            value: 'cub_skin',
            label: 'Cub Skin',
        },
        {
            value: 'hive_skin',
            label: 'Hive Skin',
        },
    ],
});
