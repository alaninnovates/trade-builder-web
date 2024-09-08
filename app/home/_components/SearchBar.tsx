'use client';
import {
	Box,
	Collapse,
	FormControl,
	FormLabel,
	Input,
	HStack,
	useDisclosure,
	Button,
	IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Select } from 'chakra-react-select';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = () => {
	const { isOpen, onToggle } = useDisclosure();
	const [search, setSearch] = useState('');
	const [dateRange, setDateRange] = useState<Date[]>([]);
	const [quantity, setQuantity] = useState<number>(0);
	const [category, setCategory] = useState<string[]>([]);
	return (
		<Box w="100%">
			<FormControl w="100%">
				<HStack>
					<Input
						placeholder="Search"
						w="100%"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<IconButton aria-label="Search" icon={<FaSearch />} />
					<Button onClick={onToggle}>Advanced</Button>
				</HStack>
				<Collapse in={isOpen} animateOpacity>
					<Box p={4} mt={4} bgColor="gray.100" borderRadius="md">
						<HStack>
							<Box>
								<FormLabel>Date Range</FormLabel>
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
							</Box>
							<Box>
								<FormLabel>Quantity</FormLabel>
								<Input
									type="number"
									onChange={(e) =>
										setQuantity(parseInt(e.target.value))
									}
								/>
							</Box>
						</HStack>
						<Box>
							<FormLabel>Category</FormLabel>
							<Select
								isMulti
								name="itemType"
								options={[
									{ value: 'sticker', label: 'Sticker' },
									{
										value: 'cub_skin',
										label: 'Cub Skin',
									},
									{
										value: 'hive_skin',
										label: 'Hive Skin',
									},
								]}
								placeholder="Select category"
								variant="filled"
								colorScheme="blue.500"
								menuPortalTarget={document.body}
								styles={{
									menuPortal: (provided) => ({
										...provided,
										zIndex: 100,
									}),
								}}
								onChange={(e) =>
									setCategory(e.map((i) => i.value))
								}
							/>
						</Box>
					</Box>
				</Collapse>
			</FormControl>
		</Box>
	);
};
