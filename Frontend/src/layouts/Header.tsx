import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';

const Header = () => {
	const { accessToken, isLoggedIn } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const naviaget = useNavigate();
	const handelLogout = () => {
		dispatch(logout());
		naviaget('/login');
	};
	return (
		<header className="text-gray-100 bg-indigo-500 body-font">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
					<h2 className="text-xl font-bold">Book Library</h2>
				</Link>
				<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
					<Link to="#" className="mr-5 font-semibold cursor-pointer hover:text-indigo-200">
						All Books
					</Link>
					{!accessToken && !isLoggedIn ? (
						<Link to="/login" className="mr-5 font-semibold cursor-pointer hover:text-indigo-200">
							Sign In
						</Link>
					) : (
						<button
							onClick={handelLogout}
							type="button"
							className="mr-5 font-semibold cursor-pointer hover:text-indigo-200"
						>
							Sign Out
						</button>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
