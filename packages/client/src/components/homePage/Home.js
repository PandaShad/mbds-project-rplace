import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import {
	Box,
	Container,
	Heading,
	Spinner,
	Flex,
	Button,
	useToast,
	Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CreateBoard from './CreateBoard';
import { useAuth } from '../../providers/authProvider';
import CardBoard from './CardBoard';
import { API_ROUTES } from '../../utils/apiRoutes';

/*
const mockOngoingBoards = [
	{ id: 1, name: 'Ongoing Board 1' },
	{ id: 2, name: 'Ongoing Board 2' },
	{ id: 3, name: 'Ongoing Board 3' },
];

const mockFinishedBoards = [
	{ id: 4, name: 'Finished Board 1' },
	{ id: 5, name: 'Finished Board 2' },
	{ id: 6, name: 'Finished Board 3' },
];*/

const HomePage = () => {
	const toast = useToast();
	const [ongoingBoards, setOngoingBoards] = useState([]);
	const [finishedBoards, setFinishedBoards] = useState([]);
	const [upcomingBoards, setUpcomingBoards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [userCount, setUserCount] = useState(0);

	useEffect(() => {
		const fetchOngoingBoards = async () => {
			try {
				const response = await axios.get(
					API_ROUTES.listOngoingBoards,
				);
				setOngoingBoards(response.data);
			} catch (error) {
				toast({
					title: 'Error Loading ongoing boards',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		};

		const fetchFinishedBoards = async () => {
			try {
				const response = await axios.get(
					API_ROUTES.listFinishedBoards,
				);
				setFinishedBoards(response.data);
			} catch (error) {
				toast({
					title: 'Error Loading finished boards',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		};

		const fetchCountUsers = async () => {
			try {
				const response = await axios.get(
					API_ROUTES.countUsers,
				);
				setUserCount(response.data.count);
			} catch (error) {
				toast({
					title: 'Error Loading user count',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		};

		const fetchUpcomingBoards = async () => {
			try {
				const response = await axios.get(
					API_ROUTES.listUpcomingBoards,
				);
				setUpcomingBoards(response.data);
			} catch (error) {
				toast({
					title: 'Error Loading upcoming boards',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		};

		const fetchData = async () => {
			setLoading(true);
			await fetchOngoingBoards();
			await fetchFinishedBoards();
			await fetchUpcomingBoards();
			await fetchCountUsers();
			setLoading(false);
		};

		fetchData();
	}, [toast]);

	const [showCreateForm, setShowCreateForm] = useState(false);

	const { token } = useAuth();

	const useCreateBoardNavigation = () => {
		const navigate = useNavigate();

		const handleCreateBoard = () => {
			if (token) {
				setShowCreateForm(true);
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
							key={board.id}
							title={board.title}
							description={board.description}
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
							key={board.id}
							title={board.title}
							description={board.description}
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
							key={board.id}
							title={board.title}
							description={board.description}
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
			{showCreateForm && <CreateBoard onClose={handleCloseForm} />}
		</Container>
	);
};

export default HomePage;
