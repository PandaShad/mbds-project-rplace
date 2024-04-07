/* eslint-disable react/prop-types */
import React from 'react';
import {
	Box,
	Text,
	Badge,
	Stack,
	Heading,
} from '@chakra-ui/react';

const BoardCard = ({ board }) => {
	const statusColor = board.status === 'ongoing' ? 'blue' : 'green';

	return (
		<Box
			p={5}
			shadow="md"
			borderWidth="1px"
			borderRadius="lg"
			width={['100%', '100%', '45%', '30%']}
			m={2}
		>
			<Heading fontSize="xl">{board.title}</Heading>
			<Text mt={2}>{board.description}</Text>
			<Stack direction="row" mt={3} align="center">
				<Badge colorScheme={statusColor}>{board.status}</Badge>
				<Text>Dimensions: {board.dimension.width}x{board.dimension.height}</Text>
				<Text ml="auto">Waiting time: {board.waiting_time} mins</Text>
			</Stack>
		</Box>
	);
};

export default BoardCard;
