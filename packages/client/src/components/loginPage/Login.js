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
} from '@chakra-ui/react';
import { PasswordField } from './PasswordField';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
	const { login } = useAuth();

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
					<Stack spacing="6">
						<FormControl>
							<FormLabel htmlFor="email">Email</FormLabel>
							<Input
								id="email"
								type="email"
								focusBorderColor="teal.500"
								borderRadius="md"
							/>
						</FormControl>
						<PasswordField />
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
							onClick={login}
							colorScheme="teal"
							size="lg"
							fontSize="md"
							w="full"
						>
							Sign in
						</Button>
					</Stack>
				</Box>
			</Stack>
		</Container>
	);
}
