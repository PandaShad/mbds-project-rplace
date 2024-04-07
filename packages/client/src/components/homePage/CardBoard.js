/* eslint-disable import/no-extraneous-dependencies */
import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import {
	Card,
	CardHeader,
	CardBody,
	Heading,
	Stack,
	Box,
	Text,
	StackDivider,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { API_ROUTES } from '../../utils/apiRoutes';
import { isAdmin } from '../../services/authService';
import UpdateBoard from './EditBoard';

const CardBoard = ({
	board, timeRemaining,
}) => {
	const dimensions = `${board.dimension.width}x${board.dimension.height}`;

	const editData = {
		title: board.title,
		description: board.description,
		width: board.dimension.width,
		height: board.dimension.height,
		startDate: board.startDate,
		endDate: board.endDate,
		override: board.override,
		waitingTime: board.waitingTime,
	};

	const navigate =	useNavigate();

	const [showAdminOptions, setShowAdminOptions] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);

	const handleClick	= async () => {
		const isUserAdmin = await isAdmin();

		if (isUserAdmin) {
			setShowAdminOptions(true);
		} else	{
			// eslint-disable-next-line no-underscore-dangle
			navigate(`/board/${board._id}`);
		}
	};

	const handleOpenBoard = () => {
		// eslint-disable-next-line no-underscore-dangle
		navigate(`/board/${board._id}`);
	};

	const handleEditBoard = () => {
		setShowEditForm(true);
		setShowAdminOptions(false);
	};

	const handleDeleteBoard = async () => {
		// eslint-disable-next-line no-underscore-dangle
		await axios.delete(API_ROUTES.deleteBoard(board._id));
		setShowAdminOptions(false);
	};

	const handleCloseEditForm = () => {
		setShowEditForm(false);
		navigate('/home');
	};

	return (
		<Box onClick={handleClick}>
			<Card width="400px">
				<CardHeader bg="teal" color="white">
					<Heading size="md">{board.title}</Heading>
				</CardHeader>

				<CardBody>
					<Stack divider={<StackDivider />} spacing="2">
						<Box>
							<Heading size="xs" textTransform="uppercase" color="teal">
								Description
							</Heading>
							<Text fontSize="sm">
								{board.description}
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
								Waiting Time: {board.waitingTime} minutes
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
					{isAdmin && (
						<Modal isOpen={showAdminOptions} onClose={() => setShowAdminOptions(false)}>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>Admin Options</ModalHeader>
								<ModalBody>
									<Stack spacing="4">
										<Button onClick={handleOpenBoard} variant="outline">Open Board</Button>
										<Button onClick={handleEditBoard} variant="outline">Edit Board</Button>
										<Button onClick={handleDeleteBoard} variant="outline">Delete Board</Button>
									</Stack>
								</ModalBody>
							</ModalContent>
						</Modal>
					)}
					<Modal isOpen={showEditForm} onClose={handleCloseEditForm}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Edit Board</ModalHeader>
							<ModalBody>
								<UpdateBoard
									onClose={handleCloseEditForm}
									defaultFields={editData}
									// eslint-disable-next-line no-underscore-dangle
									id={board._id}
								/>
							</ModalBody>
						</ModalContent>
					</Modal>
				</CardBody>
			</Card>
		</Box>
	);
};

CardBoard.propTypes = {
	board: PropTypes.shape({
		_id: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		dimension: PropTypes.shape({
			width: PropTypes.number,
			height: PropTypes.number,
		}),
		startDate: PropTypes.instanceOf(Date),
		endDate: PropTypes.instanceOf(Date),
		override: PropTypes.bool,
		waitingTime: PropTypes.number,
	}).isRequired,
	timeRemaining: PropTypes.string.isRequired,
};

export default CardBoard;
