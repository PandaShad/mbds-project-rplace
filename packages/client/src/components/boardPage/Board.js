/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Container, Heading, Spinner, Stack, Stat, StatGroup, StatLabel, StatNumber, Text,
} from '@chakra-ui/react';
import io from 'socket.io-client';
import CountDownEndDate from '../countDownEndDate/CountDownEndDate';
import ColorPicker from '../colorPicker/ColorPicker';
import { useBoard } from '../../hooks/useBoard';
import { usePixelByBoard } from '../../hooks/usePixelByBoard';
import { createPixel, updatePixel } from '../../services/pixelService';

const socket = io('http://localhost:8000');

export default function Board() {
	const { id } = useParams();
	const { board, loading } = useBoard(id);
	const { pixels, pixelsLoading } = usePixelByBoard(id);
	const [hoveredPixel, setHoveredPixel] = useState(null);
	const [selectedColor, setSelectedColor] = useState('black');
	const canvasRef = useRef(null);

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

	useEffect(() => {
		socket.on('pixel created', (newPixel) => {
			if (newPixel.board_id === id) {
				const canvas = canvasRef.current;
				const ctx = canvas.getContext('2d');
				ctx.fillStyle = newPixel.color;
				ctx.fillRect(newPixel.position.x * 16, newPixel.position.y * 16, 16, 16);
			}
		});

		socket.on('pixel updated', (updatedPixel) => {
			if (updatedPixel.board_id === id) {
				const canvas = canvasRef.current;
				const ctx = canvas.getContext('2d');
				const pixel = pixels.find((p) => p.id === updatedPixel.id);
				ctx.clearRect(pixel.position.x * 16, pixel.position.y * 16, 16, 16);
				ctx.fillStyle = updatedPixel.color;
				ctx.fillRect(updatedPixel.position.x * 16, updatedPixel.position.y * 16, 16, 16);
			}
		});

		return () => {
			socket.off('pixel created');
			socket.off('pixel updated');
		};
	}, [id, pixels]);

	const handleMouseMove = (e) => {
		const rect = canvasRef.current.getBoundingClientRect();
		const x = Math.floor((e.clientX - rect.left) / 16);
		const y = Math.floor((e.clientY - rect.top) / 16);
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
			try {
				const data = {
					color: selectedColor,
					created_by: pixel.created_by,
				};
				await updatePixel(pixel.id, data);
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				const data = {
					board_id: board._id,
					position: { x, y },
					color: selectedColor,
					created_by: '661037a222cc3bf9908192c3',
				};
				await createPixel(data);
			} catch (error) {
				console.error(error);
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

				<canvas
					ref={canvasRef}
					width={board.dimension.width * 16}
					height={board.dimension.height * 16}
					style={{ border: '1px solid black', position: 'relative' }}
					onMouseMove={handleMouseMove}
					onMouseOut={handleMouseOut}
					onMouseDown={handleMouseDown}
				/>

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
						<StatNumber>{`${board.waiting_time / 1000}s`}</StatNumber>
					</Stat>

				</StatGroup>

			</Stack>

		</Container>
	);
}
