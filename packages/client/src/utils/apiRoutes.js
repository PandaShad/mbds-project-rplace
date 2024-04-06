const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export const API_ROUTES = {
	register: `${API_BASE_URL}/auth/register`,
	login: `${API_BASE_URL}/auth/login`,
	logout: `${API_BASE_URL}/auth/logout`,
};
