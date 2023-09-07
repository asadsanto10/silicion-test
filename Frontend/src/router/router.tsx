import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AuthLayout from '../layouts/AuthLayout';
import AddBook from '../pages/AddBook';
import AllBooks from '../pages/AllBooks';
import BookDetails from '../pages/BookDetails';
import EditBook from '../pages/EditBook';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <AllBooks />,
			},
			{
				path: '/add-book',
				element: (
					<PrivateRoute>
						<AddBook />
					</PrivateRoute>
				),
			},
			{
				path: '/edit-book',
				element: (
					<PrivateRoute>
						<EditBook />
					</PrivateRoute>
				),
			},
			{
				path: '/book-details/:bookId',
				element: <BookDetails />,
			},
		],
	},

	{
		path: '/',
		element: <AuthLayout />,
		children: [
			{
				path: '/login',
				element: <Login />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default router;
