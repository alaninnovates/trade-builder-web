import { createListCollection } from '@chakra-ui/react';
import {
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from '@/components/ui/select';

export const CategorySelect = ({
	categories,
	setCategories,
}: {
	categories: string[];
	setCategories: (e: string[]) => void;
}) => {
	return (
		<SelectRoot
			collection={categoryList}
			size="sm"
			width="320px"
			multiple={true}
			value={categories}
			onValueChange={(e) =>
				setCategories(e.items.map((item) => item.value))
			}
		>
			<SelectTrigger>
				<SelectValueText placeholder="Select category" />
			</SelectTrigger>
			<SelectContent>
				{categoryList.items.map((category) => (
					<SelectItem item={category} key={category.value}>
						{category.label}
					</SelectItem>
				))}
			</SelectContent>
		</SelectRoot>
	);
};

const categoryList = createListCollection({
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
