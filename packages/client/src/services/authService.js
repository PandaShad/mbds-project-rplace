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
