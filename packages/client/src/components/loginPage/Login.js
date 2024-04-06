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
	useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PasswordField } from './PasswordField';
import { useAuth } from '../../providers/authProvider';
import { useLogin } from '../../hooks/useLogin';

export default function LoginPage() {
	const { login, loading } = useLogin();
	const { setToken } = useAuth();
	const navigate = useNavigate();
	const toast = useToast();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		const loginData = {
			email,
			password,
		};

		try {
			const data = await login(loginData);
			toast({
				title: 'Login successful',
				description: data.message,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			setToken(data.token);
			navigate('/myprofile');
		} catch (err) {
			const errorMessage = err || 'An error occurred. Please try again.';
			toast({
				title: 'Login failed',
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
							<FormControl>
								<FormLabel htmlFor="email">Email</FormLabel>
								<Input
									id="email"
									type="email"
									focusBorderColor="teal.500"
									borderRadius="md"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<PasswordField
								onChange={(e) => setPassword(e.target.value)}
							/>
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
							<Button
								onClick={handleLogin}
								colorScheme="teal"
								size="lg"
								fontSize="md"
								w="full"
								isLoading={loading}
								loadingText="Signing in"
							>
								Sign in
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Container>
	);
}
