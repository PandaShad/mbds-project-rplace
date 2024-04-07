import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../components/loginPage/Login';
import MyProfile from '../components/myProfile/MyProfile';
import SignUpPage from '../components/signUp/SignUp';
import HomePage from '../components/homePage/Home';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

const Routes = () => {
	const routesForNotAuthenticatedOnly = [
		{
			path: '/',
			element: <PublicRoute />,
			children: [
				{
					path: '/login',
					element: <Login />,
				},
				{
					path: '/signup',
					element: <SignUpPage />,
				},
			],
		},
	];

	const routesForAuthenticatedOnly = [
		{
			path: '/',
			element: <ProtectedRoute />,
			children: [
				{
					path: '/myprofile',
					element: <MyProfile />,
				},
			],
		},
	];

	const routesForEveryOne = [
		{
			path: '/',
			children: [
				{
					path: '/home',
					element: <HomePage />,
				},
			],
		},
	];

	const router = createBrowserRouter([
		...routesForNotAuthenticatedOnly,
		...routesForAuthenticatedOnly,
		...routesForEveryOne,
	]);

	return (
		<RouterProvider router={router} />);
};

export default Routes;
