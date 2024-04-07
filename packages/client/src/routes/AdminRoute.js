import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { useAuth } from '../providers/authProvider';

export const AdminRoute = () => {
	const { token, currentUser } = useAuth();
	if (currentUser === undefined || currentUser === null) {
		return <Spinner color="teal.500" size="xl" />;
	}
	if (!token || !currentUser.role === 'admin') {
		return <Navigate to="/home" />;
	}
	return <Outlet />;
};
