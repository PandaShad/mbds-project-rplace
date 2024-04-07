import React, { useState, useEffect } from 'react';
import {
	Box,
	Container,
	Heading,
	Spinner,
	Flex,
	Button,
	useToast,
	Stack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CreateBoard from './CreateBoard';
import { useAuth } from '../../providers/authProvider';
import CardBoard from './CardBoard';
import {
	fetchCountUsers,
	fetchFinishedBoards,
	fetchOngoingBoards,
	fetchUpcomingBoards,
} from '../../services/boardService';
import { isAdmin } from '../../services/authService';

const HomePage = () => {
	const toast = useToast();
	const [ongoingBoards, setOngoingBoards] = useState([]);
	const [finishedBoards, setFinishedBoards] = useState([]);
	const [upcomingBoards, setUpcomingBoards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [userCount, setUserCount] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				setOngoingBoards(await fetchOngoingBoards());
				setFinishedBoards(await fetchFinishedBoards());
				setUpcomingBoards(await fetchUpcomingBoards());
				setUserCount(await fetchCountUsers());
			} catch (error) {
				toast({
					title: 'Error Loading',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
			setLoading(false);
		};

		fetchData();
	}, [toast]);

	const [showCreateForm, setShowCreateForm] = useState(false);

	const { token } = useAuth();
	const useCreateBoardNavigation = () => {
		const navigate = useNavigate();

		const handleCreateBoard = async () => {
			if (token) {
				const isUserAdmin = await isAdmin();
				if (isUserAdmin) {
					setShowCreateForm(true);
				} else {
					toast({
						title: 'Unauthorized',
						description: 'You are not authorized to create a board',
						status: 'error',
						duration: 5000,
						isClosable: true,
					});
				}
			} else {
				toast({
					title: 'Please log in',
					description: 'You need to log in to create a board',
					status: 'info',
					duration: 5000,
					isClosable: true,
				});
				navigate('/login');
			}
		};

		return handleCreateBoard;
	};

	const handleCreateBoard = useCreateBoardNavigation();

	const handleCloseForm = () => {
		setShowCreateForm(false);
	};

	const calculateTimeRemaining = (endDate) => {
		const currentTime = new Date();
		const endDateTime = new Date(endDate);
		const difference = endDateTime.getTime() - currentTime.getTime();

		if (difference <= 0) {
			return 'Expired';
		}

		const seconds = Math.floor(difference / 1000);
		const days = Math.floor(seconds / (24 * 60 * 60));
		const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
		const minutes = Math.floor((seconds % (60 * 60)) / 60);
		const remainingSeconds = seconds % 60;

		const remainingTime = [];
		if (days > 0) {
			remainingTime.push(`${days} days`);
		}
		if (hours > 0) {
			remainingTime.push(`${hours} hours`);
		}
		if (minutes > 0) {
			remainingTime.push(`${minutes} minutes`);
		}
		if (remainingSeconds > 0) {
			remainingTime.push(`${remainingSeconds} seconds`);
		}

		return `${remainingTime.join(' ')} remaining`;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setOngoingBoards((prevBoards) => prevBoards.map((board) => ({
				...board,
				timeRemaining: calculateTimeRemaining(board.end_date),
			})));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Container
			maxW="full"
			py={{ base: '12', md: '24' }}
			px={{ base: '0', sm: '8' }}
		>
			<Heading as="h1" size="lg" textAlign="center" mb="8">
				Welcome to PixelBoard!
			</Heading>
			<Box mb="8" border="1px solid #E2E8F0" borderRadius="lg" p="4">
				<Flex alignItems="center" mb="4">
					<Heading as="h2" size="md" mr="2">
						Registered Users - {userCount}
					</Heading>
					{loading && <Spinner size="lg" />}
				</Flex>
			</Box>
			<Box mb="8" border="1px solid #E2E8F0" borderRadius="lg" p="4">
				<Flex alignItems="center" mb="4">
					<Heading as="h2" size="lg" mb="4">
						Ongoing Boards - {ongoingBoards.length}
					</Heading>
					{loading && <Spinner size="lg" />}
				</Flex>
				<Stack direction="horizontal" overflowX="auto">
					{ongoingBoards.map((board) => (
						<CardBoard
							// eslint-disable-next-line no-underscore-dangle
							key={board._id}
							board={board}
							timeRemaining={calculateTimeRemaining(board.end_date)}
						/>
					))}
				</Stack>
			</Box>
			<Box mb="8" border="1px solid #E2E8F0" borderRadius="lg" p="4">
				<Flex alignItems="center" mb="4">
					<Heading as="h2" size="lg" mb="4">
						Finished Boards - {finishedBoards.length}
					</Heading>
					{loading && <Spinner size="lg" />}
				</Flex>
				<Stack direction="horizontal" overflowX="auto" flexWrap="nowrap" spacing="4">
					{finishedBoards.map((board) => (
						<CardBoard
							// eslint-disable-next-line no-underscore-dangle
							key={board._id}
							board={board}
							timeRemaining={calculateTimeRemaining(board.end_date)}
						/>
					))}
				</Stack>
			</Box>
			<Box mb="8" border="1px solid #E2E8F0" borderRadius="lg" p="4">
				<Flex alignItems="center" mb="4">
					<Heading as="h2" size="lg" mb="4">
						Upcoming Boards - {upcomingBoards.length}
					</Heading>
					{loading && <Spinner size="lg" />}
				</Flex>
				<Stack direction="horizontal" overflowX="auto">
					{upcomingBoards.map((board) => (
						<CardBoard
							// eslint-disable-next-line no-underscore-dangle
							key={board._id}
							board={board}
							timeRemaining={calculateTimeRemaining(board.end_date)}
						/>
					))}
				</Stack>
			</Box>
			<Button
				colorScheme="teal"
				position="fixed"
				bottom="4"
				right="4"
				onClick={handleCreateBoard}
			>
				Create New Board
			</Button>
			<Modal isOpen={showCreateForm} onClose={handleCloseForm}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create New Board</ModalHeader>
					<ModalBody>
						<CreateBoard onClose={handleCloseForm} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</Container>
	);
};

export default HomePage;
