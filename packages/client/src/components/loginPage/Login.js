// eslint-disable-next-line
import React, { useState } from 'react';
import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { PasswordField } from './PasswordField';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();
		login(email, password);
	};
	return (
		<Container
			maxW="lg"
			py={{ base: '12', md: '24' }}
			px={{ base: '0', sm: '8' }}
		>
			<Stack spacing="8" align="center">
				<Heading size={{ base: 'md', md: 'lg' }} textAlign="center">
					Log in to your account
				</Heading>
				<Text color="gray.500">
					Don&apos;t have an account?{' '}
					<Link href="/signin" color="black">Sign up</Link>
				</Text>

				<Box
					w="full"
					p={{ base: '4', sm: '8' }}
					bg="white"
					boxShadow="md"
					borderRadius="md"
				>
					<form onSubmit={handleLogin}>
						<Stack spacing="6">
							<FormControl isRequired>
								<FormLabel htmlFor="email">Email</FormLabel>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									focusBorderColor="teal.500"
									borderRadius="md"
								/>
							</FormControl>
							<PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
							<HStack justify="space-between" alignItems="center">
								<Checkbox colorScheme="teal">Remember me</Checkbox>
								<Link
									color="teal.500"
									fontSize="sm"
									fontWeight="bold"
								>
									Forgot password?
								</Link>
							</HStack>
							<Button type="submit" colorScheme="teal" size="lg" fontSize="md" w="full">
								Sign in
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Container>
	);
}
