'use client';
import {
	Box,
	Input,
	HStack,
	Collapsible,
	Button,
	IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { CategorySelect } from '@/app/home/_components/CategorySelect';
import { Field } from '@/components/ui/field';

export const SearchBar = () => {
	const [search, setSearch] = useState('');
	const [dateRange, setDateRange] = useState<Date[]>([]);
	const [quantity, setQuantity] = useState<number>(0);
	const [categories, setCategories] = useState<string[]>([]);
	return (
		<Box w="100%">
			<Collapsible.Root w="100%">
				<HStack>
					<Input
						placeholder="Search"
						w="100%"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<IconButton aria-label="Search">
						<FaSearch />
					</IconButton>
					<Collapsible.Trigger asChild>
						<Button>Advanced</Button>
					</Collapsible.Trigger>
				</HStack>
				<Collapsible.Content>
					<Box p={4} mt={4} bgColor="gray.100" borderRadius="md">
						<HStack>
							<Field label="Date Range">
								<HStack>
									<Input
										type="date"
										onChange={(e) =>
											setDateRange((prev) => [
												new Date(e.target.value),
												prev.length > 1
													? prev[1]
													: new Date(),
											])
										}
									/>
									<Input
										type="date"
										onChange={(e) =>
											setDateRange((prev) => [
												prev.length > 0
													? prev[0]
													: new Date(),
												new Date(e.target.value),
											])
										}
									/>
								</HStack>
							</Field>
							<Field label="Quantity">
								<Input
									type="number"
									onChange={(e) =>
										setQuantity(parseInt(e.target.value))
									}
								/>
							</Field>
						</HStack>
						<Field label="Category">
							<CategorySelect categories={categories} setCategories={setCategories} />
						</Field>
					</Box>
				</Collapsible.Content>
			</Collapsible.Root>
		</Box>
	);
};
