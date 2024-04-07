/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import React, {
	useCallback,
	useEffect, useRef, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import {
	Box,
	Container,
	Heading, Spinner, Stack, Stat, StatGroup, StatLabel, StatNumber, Text, Tooltip, useToast,
} from '@chakra-ui/react';
import CountDownEndDate from '../countDownEndDate/CountDownEndDate';
import ColorPicker from '../colorPicker/ColorPicker';
import { useBoard } from '../../hooks/useBoard';
import { usePixelByBoard } from '../../hooks/usePixelByBoard';
import { createPixel, updatePixel } from '../../services/pixelService';
import { useAuth } from '../../providers/authProvider';
import { useWebSocket } from '../../hooks/useWebSocket';

export default function Board() {
	const { id } = useParams();
	const { board, loading } = useBoard(id);
	const { pixels, pixelsLoading, refetch } = usePixelByBoard(id);
	const [hoveredPixel, setHoveredPixel] = useState(null);
	const [selectedColor, setSelectedColor] = useState('black');
	const { currentUser } = useAuth();

	const toast = useToast();

	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
	const [tooltipData, setTooltipData] = useState(null);

	const canvasRef = useRef(null);

	const onMessage = useCallback((data) => {
		// eslint-disable-next-line no-console
		console.log('data', data);
	}, []);

	const onPixel = useCallback((data) => {
		// eslint-disable-next-line no-console
		console.log('data', data);
		refetch();
	}, [refetch]);

	useWebSocket('http://localhost:8000', onMessage, onPixel);

	useEffect(() => {
		if (!board || !canvasRef.current || !pixels) return undefined;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const drawPixels = () => {
			pixels.forEach((pixel) => {
				ctx.fillStyle = pixel.color;
				ctx.fillRect(pixel.position.x * 16, pixel.position.y * 16, 16, 16);
			});
		};

		drawPixels();

		if (hoveredPixel) {
			ctx.strokeStyle = 'teal';
			ctx.strokeRect(hoveredPixel.x * 16, hoveredPixel.y * 16, 16, 16);
		}

		return () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		};
	}, [board, pixels, hoveredPixel]);

	const handleMouseMove = (e) => {
		const rect = canvasRef.current.getBoundingClientRect();
		const x = Math.floor((e.clientX - rect.left) / 16);
		const y = Math.floor((e.clientY - rect.top) / 16);

		setTooltipPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

		const pixel = pixels.find((p) => p.position.x === x && p.position.y === y);
		if (pixel) {
			setTooltipData({
				color: pixel.color,
				user: pixel.created_by.userName,
				last_update: pixel.last_update,
				update_number: pixel.update_number,
			});
		} else {
			setTooltipData(null);
		}

		setShowTooltip(true);
		setHoveredPixel({ x, y });
	};

	const handleMouseOut = () => {
		setHoveredPixel(null);
	};

	const handleColorSelect = (color) => {
		setSelectedColor(color);
	};

	const handleMouseDown = async (e) => {
		const rect = canvasRef.current.getBoundingClientRect();
		const x = Math.floor((e.clientX - rect.left) / 16);
		const y = Math.floor((e.clientY - rect.top) / 16);
		const pixel = pixels.find((p) => p.position.x === x && p.position.y === y);
		if (pixel) {
			if (board.override) {
				try {
					const data = {
						color: selectedColor,
						created_by: currentUser._id,
					};
					await updatePixel(pixel._id, data);
				} catch (error) {
					toast({
						title: 'Error',
						description: error.response.data ? error.response.data : 'An error occurred',
						status: 'error',
						duration: 5000,
						isClosable: true,
					});
				}
			} else {
				toast({
					title: 'Error',
					description: 'Pixel already exists and cannot be overridden',
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		} else {
			try {
				const data = {
					board_id: board._id,
					position: { x, y },
					color: selectedColor,
					created_by: currentUser._id,
				};
				await createPixel(data);
			} catch (error) {
				toast({
					title: 'Error',
					description: error.response.data ? error.response.data : 'An error occurred',
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		}
	};

	if (!board || (loading && pixelsLoading)) {
		return <Spinner color="teal.500" size="xl" />;
	}

	return (
		<Container
			maxW="lg"
			py={{ base: '12', md: '24' }}
			px={{ base: '0', sm: '8' }}
		>
			<Stack spacing="4" align="center">

				<Heading size={{ base: 'md', md: 'lg' }} textAlign="center">
					{board.title}
				</Heading>

				<Stack spacing="2" align="center">

					<Text fontSize="xl" textAlign="center" color="gray.500" marginBottom="0px">
						{board.description}
					</Text>

					<CountDownEndDate endDate={board.end_date} />

				</Stack>

				<Box onMouseLeave={() => setShowTooltip(false)}>
					<Tooltip
						isOpen={showTooltip}
						label={tooltipData
							? (
								<>
									<Text fontSize="sm" marginBottom="0px">Color: {tooltipData.color}</Text>
									<Text fontSize="sm" marginBottom="0px">User: {tooltipData.user}</Text>
									<Text fontSize="sm" marginBottom="0px">Last Update: { new Date(tooltipData.last_update).toLocaleDateString()}</Text>
									<Text fontSize="sm" marginBottom="0px">Update Number: {tooltipData.update_number}</Text>
								</>
							) : 'No pixel'}
						bg="teal.500"
						color="white"
						placement="top"
						borderRadius="md"
						fontSize="sm"
						padding="2"
						left={tooltipPosition.x}
						top={tooltipPosition.y}
					>
						<canvas
							ref={canvasRef}
							width={board.dimension.width * 16}
							height={board.dimension.height * 16}
							style={{ border: '1px solid black', position: 'relative' }}
							onMouseMove={handleMouseMove}
							onMouseOut={handleMouseOut}
							onMouseDown={handleMouseDown}
						/>
					</Tooltip>
				</Box>

				<ColorPicker
					selectedColor={selectedColor}
					onColorSelect={handleColorSelect}
				/>

				<StatGroup width="100%" textAlign="center">
					<Stat>
						<StatLabel>Dimensions</StatLabel>
						<StatNumber>{`${board.dimension.width}x${board.dimension.height}`}</StatNumber>
					</Stat>

					<Stat>
						<StatLabel>Override Pixels</StatLabel>
						<StatNumber>{board.override ? 'Yes' : 'No'}</StatNumber>
					</Stat>

					<Stat>
						<StatLabel>Waiting Time</StatLabel>
						<StatNumber>{`${board.waiting_time}s`}</StatNumber>
					</Stat>

				</StatGroup>

			</Stack>

		</Container>
	);
}
