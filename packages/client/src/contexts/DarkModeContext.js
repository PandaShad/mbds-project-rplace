/* eslint-disable no-undef */
import React, {
	createContext, useContext, useState, useMemo,
} from 'react';

const DarkModeContext = createContext();

export function useDarkMode() {
	return useContext(DarkModeContext);
}

// eslint-disable-next-line react/prop-types
export function DarkModeProvider({ children }) {
	const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode); // Met à jour l'état isDarkMode

		const root = document.getElementById('root');
		const images = document.querySelectorAll('img');

		// Basculement du dark mode
		if (!isDarkMode) {
			// Activation du dark mode
			root.classList.add('darkmode');
			images.forEach((img) => img.classList.add('darkmode'));
		} else {
			// Désactivation du dark mode
			root.classList.remove('darkmode');
			images.forEach((img) => img.classList.remove('darkmode'));
		}
	};
	const value = useMemo(() => ({
		isDarkMode,
		toggleDarkMode,
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}), [isDarkMode]);

	return (
		<DarkModeContext.Provider value={value}>
			{children}
		</DarkModeContext.Provider>
	);
}
