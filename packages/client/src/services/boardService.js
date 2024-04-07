import axios from 'axios';
import { API_ROUTES } from '../utils/apiRoutes';

export const getBoardById = async (id) => {
	const response = await axios.get(API_ROUTES.getBoardById(id));
	return response.data;
};
