import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import AuthProvider from './providers/authProvider';
import Navbar from './components/navbar/Navbar';

function App() {
	return (
		<AuthProvider>
			<Navbar />
			<Routes />
		</AuthProvider>
	);
}

export default App;
