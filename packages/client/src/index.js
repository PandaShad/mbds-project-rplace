import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ChakraProvider>
		<React.StrictMode>
			<AuthProvider>
				<App />
			</AuthProvider>
		</React.StrictMode>
	</ChakraProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
