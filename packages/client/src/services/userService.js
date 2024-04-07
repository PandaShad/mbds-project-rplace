/* eslint-disable no-undef */
import axios from 'axios';
import { API_ROUTES } from '../utils/apiRoutes';

export const fetchUserInfo = async () => {
	const response = await axios.get(API_ROUTES.me, {
		headers: {
			'Content-Type': 'application/json',
			'x-access-token': `${localStorage.getItem('token')} `,
		},
	});
	return response.data;
};

export const logoutUser = async () => {
	const response = await axios.get(API_ROUTES.logout, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};
