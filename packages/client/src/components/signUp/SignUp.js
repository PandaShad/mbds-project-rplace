import React, { useState } from 'react';
// eslint-disable-next-line
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
	FormErrorMessage,
} from '@chakra-ui/react';
import { PasswordField } from '../loginPage/PasswordField';
import { useAuth } from '../../contexts/AuthContext';

export default function SignUpPage() {
	const { signup } = useAuth();
	const [emailError, setEmailError] = useState('');

	const validateEmail = (value) => {
		const isValid = /\S+@\S+\.\S+/.test(value);
		setEmailError(isValid ? '' : 'Invalid email address');
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
					<Stack spacing="6">
						<FormControl isRequired>
							<FormLabel htmlFor="firstName">
								First Name
							</FormLabel>
							<Input
								id="firstName"
								type="text"
								focusBorderColor="teal.500"
								borderRadius="md"
							/>
						</FormControl>

						<FormControl isRequired>
							<FormLabel htmlFor="lastName">Last Name</FormLabel>
							<Input
								id="lastName"
								type="text"
								focusBorderColor="teal.500"
								borderRadius="md"
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
							/>
							<FormErrorMessage>{emailError}</FormErrorMessage>
						</FormControl>

						<FormControl isRequired>
							<PasswordField />
						</FormControl>

						<FormControl isRequired>
							<HStack justify="space-between" alignItems="center">
								<Checkbox colorScheme="teal">
									I agree to the terms
								</Checkbox>
							</HStack>
						</FormControl>

						<Button
							onClick={signup}
							colorScheme="teal"
							size="lg"
							fontSize="md"
							w="full"
						>
							Sign up
						</Button>
					</Stack>
				</Box>
			</Stack>
		</Container>
	);
}
