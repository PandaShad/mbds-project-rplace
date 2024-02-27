import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
	const { login } = useAuth();

	return (
		<div>
			<div>Login</div>
			<button type="button" onClick={login}>Se connecter</button>
		</div> // Closing div tag
	);
}
