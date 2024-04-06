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

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [token, setToken_] = useState(localStorage.getItem('token'));

	const setToken = (newToken) => {
		localStorage.setItem('token', newToken);
		setToken_(newToken);
	};

	useEffect(() => {
		if (token) {
			axios.defaults.headers.common['x-access-token'] = token;
			localStorage.setItem('token', token);
		} else {
			delete axios.defaults.headers.common['x-access-token'];
			localStorage.removeItem('token');
		}
	}, [token]);

	const contextValue = useMemo(
		() => ({
			token,
			setToken,
		}),
		[token],
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
