import React from 'react';
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
	title, description, timeRemaining, width, height, waitingTime,
}) => {
	const dimensions = `${width}x${height}`;

	return (
		<Card width="400px">
			<CardHeader bg="teal" color="white">
				<Heading size="md">{title}</Heading>
			</CardHeader>

			<CardBody>
				<Stack divider={<StackDivider />} spacing="4">
					<Box>
						<Heading size="xs" textTransform="uppercase" color="teal">
							Description
						</Heading>
						<Text pt="2" fontSize="sm">
							{description}
						</Text>
					</Box>
					<Box>
						<Heading size="xs" textTransform="uppercase" color="teal">
							Informations
						</Heading>
						<Text pt="2" fontSize="sm">
							Dimensions: {dimensions}
						</Text>
						<Text pt="2" fontSize="sm">
							Waiting Time: {waitingTime} minutes
						</Text>
					</Box>
					<Box>
						<Heading size="xs" textTransform="uppercase" color="teal">
							Time Remaining
						</Heading>
						<Text pt="2" fontSize="sm">
							{timeRemaining}
						</Text>
					</Box>
				</Stack>
			</CardBody>
		</Card>
	);
};

CardBoard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	timeRemaining: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	waitingTime: PropTypes.string.isRequired,
};

export default CardBoard;
