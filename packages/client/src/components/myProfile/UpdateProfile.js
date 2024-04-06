import React, { useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Select,
	Text,
	VStack,
	Heading,
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

const UpdateProfile = () => {
	const { isAuthenticated, user, updateUserProfile } = useAuth();
	const { toggleDarkMode } = useDarkMode();
	const [profile, setProfile] = useState({
		username: user.username || '',
		email: user.email || '',
		theme: user.theme || 'light',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProfile((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (profile.theme !== user.theme) {
			toggleDarkMode();
		}
		// 假定updateUserProfile是一个可以正确处理更新逻辑的函数，
		// 包括可能的异步操作和后端通信。
		updateUserProfile(profile);
		// 由于toast已被注释，可根据需要重新启用并提供反馈
	};

	if (!isAuthenticated) {
		return <Text>You need to be logged in to view this page.</Text>;
	}

	return (
		<Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
			<VStack spacing={4} align="flex-start">
				<Heading as="h3" size="lg">
					My Profile
				</Heading>
				<form onSubmit={handleSubmit}>
					<FormControl isRequired>
						<FormLabel htmlFor="username">Username</FormLabel>
						<Input
							id="username"
							type="text"
							name="username"
							value={profile.username}
							onChange={handleInputChange}
						/>
					</FormControl>
					<FormControl isRequired mt={4}>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input
							id="email"
							type="email"
							name="email"
							value={profile.email}
							onChange={handleInputChange}
						/>
					</FormControl>
					<FormControl isRequired mt={4}>
						<FormLabel htmlFor="theme">Theme</FormLabel>
						<Select
							id="theme"
							name="theme"
							value={profile.theme}
							onChange={handleInputChange}
						>
							<option value="light">Light</option>
							<option value="dark">Dark</option>
						</Select>
					</FormControl>
					<Button mt={4} colorScheme="teal" type="submit">
						Update Profile
					</Button>
				</form>
			</VStack>
		</Box>
	);
};

export default UpdateProfile;
