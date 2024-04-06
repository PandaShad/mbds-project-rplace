import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import AuthProvider from './providers/authProvider';

function App() {
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	);
}

export default App;
