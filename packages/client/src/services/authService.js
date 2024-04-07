import axios from 'axios';
import { API_ROUTES } from '../utils/apiRoutes';

export const registerUser = async (userData) => {
	const response = await axios.post(API_ROUTES.register, userData, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

export const loginUser = async (loginData) => {
	const response = await axios.post(API_ROUTES.login, loginData, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

export const isAdmin = async () => {
	const response = await axios.get(API_ROUTES.me);
	try {
		return response.data.role === 'admin';
	} catch (error) {
		return false;
	}
};
