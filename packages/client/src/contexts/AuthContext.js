import React, {
	createContext, useContext, useState, useMemo,
} from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState({ username: '', otherInfo: '', theme: 'light' });

	const login = (username, otherInfo) => {
		setIsAuthenticated(true);
		setUser({ username, otherInfo, theme: 'light' });
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUser({ username: '', otherInfo: '', theme: 'light' });
	};
	const updateUserProfile = (updatedProfile) => {
		setUser((currentUser) => ({ ...currentUser, ...updatedProfile }));
	};

	const value = useMemo(() => ({
		isAuthenticated,
		user,
		setUser,
		login,
		logout,
		updateUserProfile,
	}), [isAuthenticated, user]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};
