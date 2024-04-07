/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
	Box,
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
import { fetchUserInfo } from '../../services/userService';
import BoardCard from '../boardCard/boardCard';
import { useAuth } from '../../providers/authProvider';

const ProfilePage = () => {
	const [userInfo, setUserInfo] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');

	const { token } = useAuth();

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const userData = await fetchUserInfo(token);
				setUserInfo(userData);
			} catch (error) {
				setErrorMessage('Problème de récupération du profil utilisateur.');
			}
		};

		getUserInfo();
	}, [token]);

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

	const ongoingBoards = userInfo.contributions.filter((c) => c.status === 'ongoing');
	const finishedBoards = userInfo.contributions.filter((c) => c.status === 'finished');
	const totalPixels = userInfo.contributions.reduce((acc, contribution) => acc + contribution.update_number, 0);

	return (
		<Flex direction="column" alignItems="center" justifyContent="center" p={5} minHeight="100vh">
			<Avatar size="2xl" name={userInfo.userName} />
			<Heading as="h2" size="xl" mt={5} mb={2}>{userInfo.userName}</Heading>
			<Text fontSize="lg">{userInfo.email}</Text>
			<Badge colorScheme="purple" variant="subtle" fontSize="lg">Total de pixels ajoutés: {totalPixels}</Badge>

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
								<BoardCard key={contribution.board_id} board={contribution.board_id} />
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
								<BoardCard key={contribution.board_id} board={contribution.board_id} />
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
