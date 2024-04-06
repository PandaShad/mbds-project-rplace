import React, { useState } from 'react';
import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Stack,
	Text,
	FormErrorMessage,
	useToast,
} from '@chakra-ui/react';
import { PasswordField } from '../loginPage/PasswordField';
import { useRegister } from '../../hooks/useRegister';

export default function SignUpPage() {
	const { register, loading } = useRegister();
	const toast = useToast();

	const [userName, setUserName] = useState('');
	const [firstName, setFirstName] = useState('Test');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('123');
	const [emailError, setEmailError] = useState('');

	const validateEmail = (value) => {
		const isValid = /\S+@\S+\.\S+/.test(value);
		setEmailError(isValid ? '' : 'Invalid email address');
	};

	const handleSignup = async () => {
		const userData = {
			userName,
			firstName,
			lastName,
			email,
			password,
		};

		try {
			const data = await register(userData);
			toast({
				title: 'Account created',
				description: data.message,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		} catch (err) {
			const errorMessage = err || 'An error occurred. Please try again.';
			toast({
				title: 'Error',
				description: errorMessage,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Container
			maxW="lg"
			py={{ base: '12', md: '24' }}
			px={{ base: '0', sm: '8' }}
		>
			<Stack spacing="8" align="center">
				<Heading size={{ base: 'md', md: 'lg' }} textAlign="center">
					Create your account
				</Heading>
				<Text color="gray.500">
					Already have an account? <Link href="/login" color="black">Log in</Link>
				</Text>

				<Box
					w="full"
					p={{ base: '4', sm: '8' }}
					bg="white"
					boxShadow="md"
					borderRadius="md"
				>
					<form onSubmit={handleSignup}>
						<Stack spacing="6">
							<FormControl isRequired>
								<FormLabel htmlFor="userName">
									User Name
								</FormLabel>
								<Input
									id="userName"
									type="text"
									focusBorderColor="teal.500"
									borderRadius="md"
									onChange={(e) => setUserName(e.target.value)}
								/>
							</FormControl>

							<FormControl isRequired>
								<FormLabel htmlFor="firstName">
									First Name
								</FormLabel>
								<Input
									id="firstName"
									type="text"
									focusBorderColor="teal.500"
									borderRadius="md"
									onAbort={(e) => setFirstName(e.target.value)}
								/>
							</FormControl>

							<FormControl isRequired>
								<FormLabel htmlFor="lastName">Last Name</FormLabel>
								<Input
									id="lastName"
									type="text"
									focusBorderColor="teal.500"
									borderRadius="md"
									onChange={(e) => setLastName(e.target.value)}
								/>
							</FormControl>

							<FormControl isInvalid={!!emailError} isRequired>
								<FormLabel htmlFor="email">Email</FormLabel>
								<Input
									id="email"
									type="email"
									focusBorderColor="teal.500"
									borderRadius="md"
									onBlur={(e) => validateEmail(e.target.value)}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<FormErrorMessage>{emailError}</FormErrorMessage>
							</FormControl>

							<FormControl isRequired>
								<PasswordField
									onChange={(e) => setPassword(e.target.value)}
								/>
							</FormControl>

							<Button
								onClick={handleSignup}
								type="submit"
								colorScheme="teal"
								size="lg"
								fontSize="md"
								w="full"
								isLoading={loading}
								loadingText="Signing up"
							>
								Sign up
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Container>
	);
}
