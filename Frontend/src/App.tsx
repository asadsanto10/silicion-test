import { Toaster } from 'react-hot-toast';
import './App.css';
import MainLayout from './layouts/MainLayout';

function App() {
	return (
		<>
			<Toaster position="top-right" />
			<MainLayout />
		</>
	);
}

export default App;
