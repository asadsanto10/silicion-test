import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';

const AuthLayout = () => {
	const { accessToken, isLoggedIn } = useAppSelector((state) => state.auth);

	const { pathname } = useLocation();

	if (accessToken && isLoggedIn) {
		return <Navigate to="/" state={{ path: pathname }} />;
	}

	return <Outlet />;
};

export default AuthLayout;
