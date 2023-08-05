import { useRoutes } from 'react-router-dom';
import Layout from 'layout';
import PageHome from 'views/Home';
import Page404 from 'views/404';
import Account from 'views/Account';
import PageContact from 'views/Contact';
import PageAbout from 'views/About/index';
import PageSignUp from 'views/SignUp';
import PageLogin from 'views/Login';
import ProductCollection from 'views/ProductCollection';
import ProductDetailPage from 'views/ProductDetail';
import AccountSavelists from 'views/Account/AccountSavelists';
import AccountPass from 'views/Account/AccountPass';
import AccountBilling from 'views/Account/AccountBilling';
import AccountOrder from 'views/Account';
import CartPage from 'views/ProductDetail/CartPage';
import CheckoutPage from 'views/Checkout';
import ListProfiles from 'views/Profile/ListProfiles';
import ViewProfile from 'views/Profile/ViewProfile';
import EditProfile from 'views/Profile/EditProfile';
import CreateProfile from 'views/Profile/CreateProfile';

// ==============================|| ROUTING RENDER ||============================== //

const PublicRoutes = {
	path: '/',
	element: <Layout />,
	children: [
		{
			path: '/',
			element: <PageHome />,
			restricted: false,
		},
		{
			path: '/contact',
			element: <PageContact />,
			restricted: false,
		},
		{
			path: '/about',
			element: <PageAbout />,
			restricted: false,
		},
		{
			path: '/products',
			element: <ProductCollection />,
			restricted: false,
		},
		{
			path: '/product-detail',
			element: <ProductDetailPage />,
			restricted: false,
		},
		{
			path: '/cart',
			element: <CartPage />,
			restricted: false,
		},
        {
			path: '/@/:username',
			element: <CartPage />,
			restricted: false,
		},
		{
			path: '*',
			element: <Page404 />,
			restricted: false,
		},
	],
};

const ProtectedRoutes = {
	path: '/',
	element: <Layout restricted />,
	children: [
		{
			path: '/checkout',
			element: <CheckoutPage />,
			restricted: true,
		},
		{
			path: '/account',
			element: <Account />,
			restricted: true,
		},
		{
			path: '/profiles',
			element: <ListProfiles />,
			restricted: true,
		},
        {
			path: '/profile/create',
			element: <CreateProfile />,
			restricted: true,
		},
        {
			path: '/profile/:username',
			element: <ViewProfile />,
			restricted: true,
		},
        {
			path: '/profile/edit/:username',
			element: <EditProfile />,
			restricted: true,
		},
		{
			path: '/account/change-password',
			element: <AccountPass />,
			restricted: true,
		},
		{
			path: '/account/savelists',
			element: <AccountSavelists />,
			restricted: true,
		},
		{
			path: '/account/address',
			element: <AccountBilling />,
			restricted: true,
		},
		{
			path: '/account/orders',
			element: <AccountOrder />,
			restricted: true,
		},
	],
};

const LoginRoutes = {
	path: '/',
	element: <Layout redirect />,
	children: [
		{
			path: '/login',
			element: <PageLogin />,
			restricted: false,
		},
		{
			path: '/signup',
			element: <PageSignUp />,
			restricted: false,
		},
	],
};

export default function ThemeRoutes() {
	return useRoutes([PublicRoutes, LoginRoutes, ProtectedRoutes]);
}
