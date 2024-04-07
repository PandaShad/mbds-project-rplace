import axios from 'axios';
import { API_ROUTES } from '../utils/apiRoutes';

export const createPixel = async (data) => {
	const response = await axios.post(API_ROUTES.createPixel, data, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

export const getPixelByBoardId = async (id) => {
	const response = await axios.get(API_ROUTES.getPixelByBoardId(id));
	return response.data;
};

export const updatePixel = async (data) => {
	const response = await axios.put(API_ROUTES.updatePixel, data, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};
