import axios from 'axios';
import { API_ROUTES } from '../utils/apiRoutes';

export const getBoardById = async (id) => {
	const response = await axios.get(API_ROUTES.getBoardById(id));
	return response.data;
};

export const fetchOngoingBoards = async () => {
	const response = await axios.get(
		API_ROUTES.listOngoingBoards,
	);
	return response.data;
};

export const fetchFinishedBoards = async () => {
	const response = await axios.get(
		API_ROUTES.listFinishedBoards,
	);
	return response.data;
};

export const fetchUpcomingBoards = async () => {
	const response = await axios.get(
		API_ROUTES.listUpcomingBoards,
	);
	return response.data;
};

export const fetchCountUsers = async () => {
	const response = await axios.get(
		API_ROUTES.countUsers,
	);
	return response.data.count;
};
