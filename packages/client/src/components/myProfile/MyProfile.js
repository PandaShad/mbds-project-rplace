import React from 'react';
import {
	Box, Heading, Text, Button, Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function MyProfile() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};
	const handleEditProfile = () => {
		navigate('/updateprofile');
	};

	return (
		<Box maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} m="auto">
			<Heading as="h2" size="xl" textAlign="center" mb="6">
				User Profile
			</Heading>
			{/* afficher info de Profile  */}
			<Text fontSize="lg" mb="2"><strong>Email:</strong> {user.username}</Text>
			<Text fontSize="lg" mb="4"><strong>other:</strong> {user.otherInfo}</Text>
			<Stack direction="row" spacing={4} align="center" justifyContent="center">
				<Button colorScheme="teal" onClick={handleEditProfile}>Edit Profile</Button>
				<Button colorScheme="red" onClick={handleLogout}>Logout</Button>
			</Stack>
		</Box>
	);
}

export default MyProfile;
