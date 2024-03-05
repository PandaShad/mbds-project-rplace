import React, { useState, useEffect } from 'react';

// eslint-disable-next-line
import {
	Box,
	Button,
	Container,
	Heading,
	Link,
	Stack,
	Text,
	VStack,
	Divider,
	SimpleGrid,
	Spinner,
} from '@chakra-ui/react';

// Fonction pour obtenir des données factices sur les utilisateurs et les PixelBoards
const fetchUserData = () => new Promise((resolve) => {
	setTimeout(() => resolve({
		totalUsers: 1000,
		totalPixelBoards: 500,
		latestInProgress: [
			{ id: 1, name: 'PixelBoard In Progress 1' },
			{ id: 2, name: 'PixelBoard In Progress 2' },
		],
		latestCompleted: [
			{ id: 3, name: 'PixelBoard Completed 1' },
			{ id: 4, name: 'PixelBoard Completed 2' },
		],
	}), 1000);
});

const HomePage = () => {
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		// Charge les données sur la page d'accueil
		const fetchData = async () => {
			const data = await fetchUserData();
			setUserData(data);
		};

		fetchData();
	}, []);

	return (
		<Container
			maxW="lg"
			py={{ base: '12', md: '24' }}
			px={{ base: '0', sm: '8' }}
		>
			<Stack spacing="8" align="center">
				<Heading size={{ base: 'md', md: 'lg' }} textAlign="center">
					Welcome to PixelBoard!
				</Heading>
				<VStack spacing="4" align="start" w="100%">
					{userData ? (
						<>
							<Stack
								direction="row"
								spacing="4"
								justifyContent="space-between"
								w="100%"
							>
								<Box>
									<Text fontSize="xl" fontWeight="bold">
										Total Users
									</Text>
									<Text>{userData.totalUsers}</Text>
								</Box>
								<Box>
									<Text fontSize="xl" fontWeight="bold">
										Total PixelBoards
									</Text>
									<Text>{userData.totalPixelBoards}</Text>
								</Box>
							</Stack>
							<Divider />
							<VStack spacing="4" align="start" w="100%">
								<Text fontSize="xl" fontWeight="bold">
									Latest PixelBoards in Progress:
								</Text>
								<SimpleGrid columns={1} spacing={2} w="100%">
									{userData.latestInProgress.map((board) => (
										<Link
											key={board.id}
											href={`/pixelboard/${board.id}`}
										>
											{board.name}
										</Link>
									))}
								</SimpleGrid>
							</VStack>
							<Divider />
							<VStack spacing="4" align="start" w="100%">
								<Text fontSize="xl" fontWeight="bold">
									Latest Completed PixelBoards:
								</Text>
								<SimpleGrid columns={1} spacing={2} w="100%">
									{userData.latestCompleted.map((board) => (
										<Link
											key={board.id}
											href={`/pixelboard/${board.id}`}
										>
											{board.name}
										</Link>
									))}
								</SimpleGrid>
							</VStack>
						</>
					) : (
						<Spinner size="xl" />
					)}
				</VStack>
				<Stack spacing="4" direction="row">
					<Button as={Link} href="/login" colorScheme="teal">
						Log in
					</Button>
					<Button as={Link} href="/signup" colorScheme="teal">
						Sign up
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
};

export default HomePage;
