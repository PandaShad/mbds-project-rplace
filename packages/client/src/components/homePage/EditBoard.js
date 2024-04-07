import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	InputGroup,
	InputRightElement,
	IconButton,
	Checkbox,
	useToast,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';
import { API_ROUTES } from '../../utils/apiRoutes';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';

const UpdateBoard = ({ onClose, defaultFields, id }) => {
	const [formData, setFormData] = useState({
		title: defaultFields.title,
		override: defaultFields.override,
		description: defaultFields.description,
		width: defaultFields.width,
		height: defaultFields.height,
		startDate: defaultFields.startDate,
		endDate: defaultFields.endDate,
	});
	const toast = useToast();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleIncrement = (field) => {
		setFormData({ ...formData, [field]: formData[field] + 1 });
	};

	const handleDecrement = (field) => {
		if (formData[field] > 1) {
			setFormData({ ...formData, [field]: formData[field] - 1 });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(API_ROUTES.updateBoard(id), formData);
			toast({
				title: 'Success',
				description: 'Board updated successfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			onClose();
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to update board',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			p="4"
			bg="white"
			border="1px solid"
			borderColor="gray.200"
			borderRadius="lg"
			boxShadow="lg"
			maxW="xl"
			mx="auto"
		>
			<form onSubmit={handleSubmit}>
				<VStack spacing="4">
					<FormControl>
						<FormLabel>Title</FormLabel>
						<Input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Description</FormLabel>
						<Input
							type="text"
							name="description"
							value={formData.description}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Width</FormLabel>
						<InputGroup>
							<Input
								type="number"
								name="width"
								value={formData.width}
								onChange={handleChange}
							/>
							<InputRightElement>
								<IconButton
									aria-label="Increase Width"
									icon={<AddIcon />}
									onClick={() => handleIncrement('width')}
								/>
								<IconButton
									aria-label="Decrease Width"
									icon={<MinusIcon />}
									onClick={() => handleDecrement('width')}
								/>
							</InputRightElement>
						</InputGroup>
					</FormControl>
					<FormControl>
						<FormLabel>Height</FormLabel>
						<InputGroup>
							<Input
								type="number"
								name="height"
								value={formData.height}
								onChange={handleChange}
							/>
							<InputRightElement>
								<IconButton
									aria-label="Increase Height"
									icon={<AddIcon />}
									onClick={() => handleIncrement('height')}
								/>
								<IconButton
									aria-label="Decrease Height"
									icon={<MinusIcon />}
									onClick={() => handleDecrement('height')}
								/>
							</InputRightElement>
						</InputGroup>
					</FormControl>
					<FormControl>
						<FormLabel>Start Date</FormLabel>
						<DatePicker
							selected={formData.startDate}
							onChange={(date) => setFormData({ ...formData, startDate: date })}
							dateFormat="yyyy-MM-dd"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>End Date</FormLabel>
						<DatePicker
							selected={formData.endDate}
							onChange={(date) => setFormData({ ...formData, endDate: date })}
							dateFormat="yyyy-MM-dd"
						/>
					</FormControl>
					<FormControl>
						<Checkbox
							isChecked={formData.override}
							onChange={(e) => setFormData({ ...formData, override: e.target.checked })}
						>
							Allow Override
						</Checkbox>
					</FormControl>
					<Button type="submit" colorScheme="teal">
						Update Board
					</Button>
					<Button onClick={onClose} colorScheme="gray">
						Cancel
					</Button>
				</VStack>
			</form>
		</Box>
	);
};

UpdateBoard.propTypes = {
	onClose: PropTypes.func.isRequired,
	defaultFields: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		width: PropTypes.number,
		height: PropTypes.number,
		startDate: PropTypes.instanceOf(Date),
		endDate: PropTypes.instanceOf(Date),
		override: PropTypes.bool,
	}).isRequired,
	id: PropTypes.string.isRequired,
};

export default UpdateBoard;
