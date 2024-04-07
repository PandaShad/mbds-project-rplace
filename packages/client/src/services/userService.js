import axios from 'axios';
import { API_ROUTES } from '../utils/apiRoutes';

export const fetchUserInfo = async () => {
	const response = await axios.get(API_ROUTES.me, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

export const fetchOngoingBoards = async () => {
	const response = await axios.get(API_ROUTES.ongoingBoards, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

export const fetchFinishedBoards = async () => {
	const response = await axios.get(API_ROUTES.finishedBoards, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};
