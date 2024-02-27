import React, {
	createContext, useContext, useState, useMemo,
} from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = () => setIsAuthenticated(true);
	const logout = () => setIsAuthenticated(false);

	const value = useMemo(() => ({
		isAuthenticated,
		login,
		logout,
	}), [isAuthenticated]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};
