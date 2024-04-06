import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/authProvider';

export const PublicRoute = () => {
	const { token } = useAuth();
	if (token) {
		return <Navigate to="/myprofile" />;
	}
	return <Outlet />;
};
