/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	Flex,
	Text,
	Avatar,
	Heading,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Badge,
} from '@chakra-ui/react';
import { useAuth } from '../../providers/authProvider';
import { fetchUserInfo, logoutUser } from '../../services/userService';
import BoardCard from '../boardCard/boardCard';

const ProfilePage = () => {
	const [userInfo, setUserInfo] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const userData = await fetchUserInfo();
				setUserInfo(userData);
			} catch (error) {
				setErrorMessage('Problème de récupération du profil utilisateur.');
			}
		};

		getUserInfo();
	}, []);

	const { setToken } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logoutUser();
		setToken(null);
		navigate('/login', { replace: true });
	};

	if (errorMessage) {
		return (
			<Flex direction="column" alignItems="center" justifyContent="center" p={5} minHeight="100vh">
				<Alert status="error">
					<AlertIcon />
					<Box flex="1">
						<AlertTitle>Erreur!</AlertTitle>
						<AlertDescription display="block">{errorMessage}</AlertDescription>
					</Box>
				</Alert>
			</Flex>
		);
	}

	if (!userInfo) {
		return <Box>Chargement...</Box>;
	}

	const ongoingBoards = userInfo.contributions.filter((c) => c.board_id.status === 'ongoing');
	const finishedBoards = userInfo.contributions.filter((c) => c.board_id.status === 'finished');
	const totalPixels = userInfo.contributions.reduce((acc, contribution) => acc + contribution.update_number, 0);

	return (
		<Flex direction="column" alignItems="center" justifyContent="center" p={5} minHeight="100vh">
			<Avatar size="2xl" name={userInfo.userName} />
			<Heading as="h2" size="xl" mt={5} mb={2}>{userInfo.userName}</Heading>
			<Text fontSize="lg">{userInfo.email}</Text>
			<Badge colorScheme="purple" variant="subtle" fontSize="lg">Total de pixels ajoutés: {totalPixels}</Badge>
			<Button colorScheme="red" onClick={handleLogout} m={3}>Logout</Button>

			<Accordion allowToggle w="full" mt={10}>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">Boards en Cours</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						{ongoingBoards.length > 0 ? (
							ongoingBoards.map((contribution) => (
								<BoardCard key={contribution.board_id._id} board={contribution.board_id} />
							))
						) : (
							<Text>Pas de contributions en cours.</Text>
						)}
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">Boards Terminés</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						{finishedBoards.length > 0 ? (
							finishedBoards.map((contribution) => (
								<BoardCard key={contribution.board_id._id} board={contribution.board_id} />
							))
						) : (
							<Text>Pas de contributions terminées.</Text>
						)}
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Flex>
	);
};

export default ProfilePage;
