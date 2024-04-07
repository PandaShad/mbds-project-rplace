const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export const API_ROUTES = {
	register: `${API_BASE_URL}/auth/register`,
	login: `${API_BASE_URL}/auth/login`,
	logout: `${API_BASE_URL}/auth/logout`,
	me: `${API_BASE_URL}/auth/me`,

	getBoardById: (id) => `${API_BASE_URL}/board/${id}`,
	createBoard: `${API_BASE_URL}/board/create`,
	listOnGoingBoard: `${API_BASE_URL}/board/list-ongoing`,
	listFinishedBoard: `${API_BASE_URL}/board/list-finished`,
	countBoard: `${API_BASE_URL}/board/count`,
	updateBoard: (id) => `${API_BASE_URL}/board/${id}/update`,
	deleteBoard: (id) => `${API_BASE_URL}/board/${id}/delete`,

	createPixel: `${API_BASE_URL}/pixel/create`,
	getPixelByBoardId: (boardId) => `${API_BASE_URL}/pixel/getBoard/${boardId}`,
	updatePixel: (id) => `${API_BASE_URL}/pixel/${id}/update`,
};
