import Header from 'components/Header/Header';
import AuthWrapper from 'layout/AuthWrapper';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { Toaster } from 'react-hot-toast';

// ==============================|| MINIMAL LAYOUT ||============================== //

const Layout = ({ restricted = false, redirect = false }) => (
	<AuthWrapper key={restricted + '' + redirect} restricted={restricted} redirect={redirect}>
		<Toaster />
		<ScrollToTop />
		<Header />
		<Outlet />
	</AuthWrapper>
);

export default Layout;
