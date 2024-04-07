import axios from 'axios';
import { API_ROUTES } from '../utils/apiRoutes';

export const fetchUserInfo = async (token) => {
	const response = await axios.get(API_ROUTES.me, {
		headers: {
			'Content-Type': 'application/json',
			'x-access-token': token,
		},
	});
	return response.data;
};
