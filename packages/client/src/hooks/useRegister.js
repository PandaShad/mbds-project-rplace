import { useState } from 'react';
import { registerUser } from '../services/authService';

export const useRegister = () => {
	const [loading, setLoading] = useState(false);

	const register = async (userData) => {
		setLoading(true);
		try {
			const response = await registerUser(userData);
			setLoading(false);
			return response;
		} catch (err) {
			setLoading(false);
			throw err.response.data;
		}
	};
	return { loading, register };
};
