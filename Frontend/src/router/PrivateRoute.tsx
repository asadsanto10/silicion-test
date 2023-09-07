import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';

interface IProps {
	children: ReactNode;
}
const PrivateRoute = ({ children }: IProps) => {
	const { accessToken, isLoggedIn } = useAppSelector((state) => state.auth);

	const { pathname } = useLocation();

	if (!accessToken && !isLoggedIn) {
		return <Navigate to="/login" state={{ path: pathname }} />;
	}

	return children;
};

export default PrivateRoute;
