/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import {
	createContext,
	useContext,
	useEffect,
	useState,
	useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { API_ROUTES } from '../utils/apiRoutes';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [token, setToken_] = useState(localStorage.getItem('token'));
	const [currentUser, setCurrentUser] = useState(null);

	const setToken = (newToken) => {
		localStorage.setItem('token', newToken);
		setToken_(newToken);
	};

	useEffect(() => {
		const fetchCurrentUser = async () => {
			if (token) {
				axios.defaults.headers.common['x-access-token'] = token;
				localStorage.setItem('token', token);

				try {
					const response = await axios.get(API_ROUTES.me);
					setCurrentUser(response.data);
				} catch (error) {
					setCurrentUser(null);
				}
			} else {
				delete axios.defaults.headers.common['x-access-token'];
				localStorage.removeItem('token');
				setCurrentUser(null);
			}
		};

		fetchCurrentUser();
	}, [token]);

	const contextValue = useMemo(
		() => ({
			token,
			currentUser,
			setToken,
		}),
		[token, currentUser],
	);

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
