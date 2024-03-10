import React, { useState, useEffect, useRef } from 'react';
import {
	Box,
	Button,
	Container,
	Heading,
	Text,
	VStack,
	HStack,
	Spacer,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	ButtonGroup,
} from '@chakra-ui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

// Exemple de données factices pour le PixelBoard
const pixelBoardData = {
	title: 'PixelBoard #0',
	size: 16,
	participationDelay: 60, // en secondes
	drawOnExistingPixel: true,
	remainingTime: 1200, // en secondes
};

const PixelBoardPage = () => {
	const [timeRemaining, setTimeRemaining] = useState(
		pixelBoardData.remainingTime,
	);
	const [selectedColor, setSelectedColor] = useState('#000000'); // Couleur par défaut

	const canvasRef = useRef(null);

	const updateCanvas = (e) => {
		if (timeRemaining <= 0) return;

		const canvas = canvasRef.current;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const ctx = canvas.getContext('2d');
		const pixelSize = canvas.width / pixelBoardData.size;

		const pixelX = Math.floor(x / pixelSize);
		const pixelY = Math.floor(y / pixelSize);

		ctx.fillStyle = selectedColor;
		ctx.fillRect(pixelX * pixelSize, pixelY * pixelSize, pixelSize, pixelSize);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<Container
			maxW="xl"
			py={{ base: '12', md: '24' }}
			px={{ base: '0', sm: '8' }}
		>
			<VStack spacing="8" align="center">
				<Heading size={{ base: 'md', md: 'lg' }} textAlign="center">
					{pixelBoardData.title}
				</Heading>
				<HStack spacing="4">
					<Text>
						Size: {pixelBoardData.size}x{pixelBoardData.size}
					</Text>
					<Spacer />
					<Text>
						Participation Delay: {pixelBoardData.participationDelay}{' '}
						seconds
					</Text>
					<Spacer />
					<Text>Time Remaining: {timeRemaining} seconds</Text>
				</HStack>
				<Box w="100%" maxW="xl" position="relative">
					<Popover placement="right" isLazy>
						<PopoverTrigger>
							<Box
								as="button"
								bg={selectedColor}
								w="40px"
								h="40px"
								borderRadius="full"
							/>
						</PopoverTrigger>
						<PopoverContent closeOnSelect>
							<PopoverBody>
								<ColorPicker onSelect={(color) => setSelectedColor(color)} />
							</PopoverBody>
						</PopoverContent>
					</Popover>
					<canvas
						ref={canvasRef}
						width={pixelBoardData.size * 20}
						height={pixelBoardData.size * 20}
						style={{ border: '1px solid #000' }}
						onClick={updateCanvas}
					/>
				</Box>
				<Text fontSize="lg" fontWeight="bold" mt="4">
					{pixelBoardData.drawOnExistingPixel
						? 'You can draw over existing pixels.'
						: 'Drawing over existing pixels is not allowed.'}
				</Text>
				<Button
					colorScheme="teal"
					mt="4"
					onClick={() => console.log('Save Drawing')}
				>
					Save Drawing
				</Button>
			</VStack>
		</Container>
	);
};

const ColorPicker = ({ onSelect }) => {
	const colors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

	return (
		<ButtonGroup direction="column">
			{colors.map((color) => (
				<Button
					key={color}
					bg={color}
					h="40px"
					borderRadius="full"
					onClick={() => onSelect(color)}
				/>
			))}
		</ButtonGroup>
	);
};

ColorPicker.propTypes = {
	onSelect: PropTypes.func.isRequired,
};

export default PixelBoardPage;
