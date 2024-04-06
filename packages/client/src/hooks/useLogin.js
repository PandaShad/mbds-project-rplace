import { useState } from 'react';
import { loginUser } from '../services/authService';

export const useLogin = () => {
	const [loading, setLoading] = useState(false);

	const login = async (loginData) => {
		setLoading(true);
		try {
			const response = await loginUser(loginData);
			setLoading(false);
			return response;
		} catch (err) {
			setLoading(false);
			throw err.response.data;
		}
	};
	return { loading, login };
};
