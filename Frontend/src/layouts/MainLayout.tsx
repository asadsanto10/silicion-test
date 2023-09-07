import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const MainLayout = () => {
	return (
		<>
			<Header />
			<div className="mt-7">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default MainLayout;
