import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import {
	Box,
	Container,
	Heading,
	Link,
	Spinner,
	SimpleGrid,
	Flex,
	Button,
	useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CreateBoard from './CreateBoard';
import { useAuth } from '../../providers/authProvider';

const mockOngoingBoards = [
	{ id: 1, name: 'Ongoing Board 1' },
	{ id: 2, name: 'Ongoing Board 2' },
	{ id: 3, name: 'Ongoing Board 3' },
];

const mockFinishedBoards = [
	{ id: 4, name: 'Finished Board 1' },
	{ id: 5, name: 'Finished Board 2' },
	{ id: 6, name: 'Finished Board 3' },
];

const HomePage = () => {
	const toast = useToast();
	const [ongoingBoards, setOngoingBoards] = useState([]);
	const [finishedBoards, setFinishedBoards] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOngoingBoards = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8000/api/board/list-ongoing',
				);
				setOngoingBoards(response.data);
			} catch (error) {
				toast({
					title: 'Error Loading',
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
					'http://localhost:8000/api/board/list-finished',
				);
				setFinishedBoards(response.data);
			} catch (error) {
				toast({
					title: 'Error Loading',
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
			setLoading(false);
		};

		fetchData();
	}, [toast]);

	const [showCreateForm, setShowCreateForm] = useState(false);

	const { user } = useAuth();

	const useCreateBoardNavigation = () => {
		const navigate = useNavigate();

		const handleCreateBoard = () => {
			if (!user) {
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

	return (
		<Container
			maxW="lg"
			py={{ base: '12', md: '24' }}
			px={{ base: '0', sm: '8' }}
		>
			<Heading as="h1" size="lg" textAlign="center" mb="8">
				Welcome to PixelBoard!
			</Heading>
			<Box mb="8">
				<Flex alignItems="center" mb="4">
					<Heading as="h2" size="md" mr="2">
						Ongoing Boards - {ongoingBoards.length}
					</Heading>
					{loading && <Spinner size="lg" />}
				</Flex>
				{loading ? (
					mockOngoingBoards.map((board) => (
						<Link key={board.id} href="#">
							{board.name}
						</Link>
					))
				) : (
					<SimpleGrid columns={1} spacing={2}>
						{ongoingBoards.map((board) => (
							<Link
								key={board.id}
								href={`/pixelboard/${board.id}`}
							>
								{board.name}
							</Link>
						))}
					</SimpleGrid>
				)}
			</Box>
			<Box>
				<Flex alignItems="center" mb="4">
					<Heading as="h2" size="md" mr="2">
						Finished Boards - {finishedBoards.length}
					</Heading>
					{loading && <Spinner size="lg" />}
				</Flex>
				{loading ? (
					mockFinishedBoards.map((board) => (
						<Link key={board.id} href="#">
							{board.name}
						</Link>
					))
				) : (
					<SimpleGrid columns={1} spacing={2}>
						{finishedBoards.map((board) => (
							<Link
								key={board.id}
								href={`/pixelboard/${board.id}`}
							>
								{board.name}
							</Link>
						))}
					</SimpleGrid>
				)}
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
