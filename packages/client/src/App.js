import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/homePage/Home';
import Login from './components/loginPage/Login';
import SignUp from './components/signUp/SignUp';
import MyProfile from './components/myProfile/MyProfile';
import PixelBoard from './components/pixelBoard/PixelBoard';
import { useAuth } from './contexts/AuthContext';

function App() {
	const { isAuthenticated } = useAuth();

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={isAuthenticated ? <Navigate to="/myprofile" /> : <Login />} />
				<Route path="/signin" element={isAuthenticated ? <Navigate to="/myprofile" /> : <SignUp />} />
				<Route path="/myprofile" element={isAuthenticated ? <MyProfile /> : <Navigate to="/login" />} />
				<Route path="/pixelboard" element={<PixelBoard />} />
			</Routes>
		</Router>
	);
}

export default App;
