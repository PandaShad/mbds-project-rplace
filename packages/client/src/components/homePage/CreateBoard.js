// CreateBoard.jsx
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
} from '@chakra-ui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const CreateBoard = ({ onClose }) => {
	const [formData, setFormData] = useState({
		title: '',
		override: false,
		description: '',
		width: 16,
		height: 16,
		waitingTime: 30,
		startDate: new Date(),
	});

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
		const boardData	= {
			title: formData.title,
			override: formData.override,
			description: formData.description,
			dimension:	{
				width: formData.width,
				height: formData.height,
			},
			waitingTime: formData.waitingTime,
			startDate: formData.startDate,
			endDate: formData.endDate,
			status: '',
			createdBy: '',
		};
		console.log(boardData);

		try {
			const response = await axios.post('http://localhost:8000/api/board/create', boardData);
			console.log(response.data);
			onClose();
		} catch (error) {
			console.error('Error creating board:', error);
		}
		onClose();
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
						<FormLabel>Waiting Time</FormLabel>
						<InputGroup>
							<Input
								type="number"
								name="waitingTime"
								value={formData.waitingTime}
								onChange={handleChange}
							/>
							<InputRightElement>
								<IconButton
									aria-label="Increase Waiting Time"
									icon={<AddIcon />}
									onClick={() => handleIncrement('waitingTime')}
								/>
								<IconButton
									aria-label="Decrease Waiting Time"
									icon={<MinusIcon />}
									onClick={() => handleDecrement('waitingTime')}
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
						Create Board
					</Button>
					<Button onClick={onClose} colorScheme="gray">
						Cancel
					</Button>
				</VStack>
			</form>
		</Box>
	);
};

CreateBoard.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default CreateBoard;
