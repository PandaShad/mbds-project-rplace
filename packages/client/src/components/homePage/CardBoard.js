import React from 'react';
import { Link } from 'react-router-dom';
import {
	Card,
	CardHeader,
	CardBody,
	Heading,
	Stack,
	Box,
	Text,
	StackDivider,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CardBoard = ({
	id, title, description, timeRemaining, width, height, waitingTime,
}) => {
	const dimensions = `${width}x${height}`;

	return (
		<Link to={`/board/${id}`}>
			<Card width="400px">
				<CardHeader bg="teal" color="white">
					<Heading size="md">{title}</Heading>
				</CardHeader>

				<CardBody>
					<Stack divider={<StackDivider />} spacing="2">
						<Box>
							<Heading size="xs" textTransform="uppercase" color="teal">
								Description
							</Heading>
							<Text fontSize="sm">
								{description}
							</Text>
						</Box>
						<Box>
							<Heading size="xs" textTransform="uppercase" color="teal">
								Informations
							</Heading>
							<Text fontSize="sm">
								Dimensions: {dimensions}
							</Text>
							<Text fontSize="sm">
								Waiting Time: {waitingTime} minutes
							</Text>
						</Box>
						<Box>
							<Heading size="xs" textTransform="uppercase" color="teal">
								Time Remaining
							</Heading>
							<Text fontSize="sm">
								{timeRemaining}
							</Text>
						</Box>
					</Stack>
				</CardBody>
			</Card>
		</Link>
	);
};

CardBoard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	timeRemaining: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	waitingTime: PropTypes.number.isRequired,
};

export default CardBoard;
