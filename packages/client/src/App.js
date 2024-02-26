import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar  from './components/navbar/Navbar';
import Home from './components/homePage/Home';
import Login from './components/loginPage/Login';
import SignIn from './components/signIn/SignIn';
import MyProfile from './components/myProfile/MyProfile';
import PixelBoards from './components/pixelBoards/PixelBoards';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';



function App() {
	const { isAuthenticated } = useAuth();

	return (
	  <Router>
		<Navbar />
		<Routes>
		  <Route path="/" element={<Home />} />
		  <Route path="/login" element={isAuthenticated ? <Navigate to="/myprofile" /> : <Login />} />
		  <Route path="/signin" element={isAuthenticated ? <Navigate to="/myprofile" /> : <SignIn />} />
		  <Route path="/myprofile" element={isAuthenticated ? <MyProfile /> : <Navigate to="/login" />} />
		  <Route path="/pixelboards" element={isAuthenticated ? <PixelBoards /> : <Navigate to="/login" />} />
		</Routes>
	  </Router>
	);
  }

export default App;
