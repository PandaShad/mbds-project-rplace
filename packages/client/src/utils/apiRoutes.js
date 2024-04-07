const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export const API_ROUTES = {
	register: `${API_BASE_URL}/auth/register`,
	login: `${API_BASE_URL}/auth/login`,
	logout: `${API_BASE_URL}/auth/logout`,
	me: `${API_BASE_URL}/auth/me`,
	createBoard: `${API_BASE_URL}/board/create`,
	listOngoingBoards: `${API_BASE_URL}/board/list-ongoing`,
	listFinishedBoards: `${API_BASE_URL}/board/list-finished`,
	listUpcomingBoards: `${API_BASE_URL}/board/list-upcoming`,
	countUsers: `${API_BASE_URL}/auth/count`,
};
