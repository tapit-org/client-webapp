import { useRoutes } from "react-router-dom";
import Layout from "layout";
// import PageHome from "views/Home";
// import Page404 from "views/404";
// import Account from "views/Account";
// import PageContact from "views/Contact";
// import PageAbout from "views/About/index";
// import PageSignUp from "views/SignUp";
// import Login from "views/Login";
// import ProductCollection from "views/ProductCollection";
// import ProductDetailPage from "views/ProductDetail";
// import AccountSavelists from "views/Account/AccountSavelists";
// import AccountPass from "views/Account/AccountPass";
// import AccountAddress from "views/Account/AccountAddress";
// import Orders from "views/Orders";
// import Cart from "views/Cart";
// import CheckoutPage from "views/Checkout";
// import ListProfiles from "views/Profile";
import ViewProfile from "views/Profile/ViewProfile";
import Page404 from "views/404";
// import EditProfile from "views/Profile/EditProfile";
// import CreateProfile from "views/Profile/CreateProfile";

// ==============================|| ROUTING RENDER ||============================== //

const PublicRoutes = {
	path: "/",
	element: <Layout />,
	children: [
		// {
		// 	path: "/",
		// 	element: <PageHome />,
		// },
		// {
		// 	path: "/contact",
		// 	element: <PageContact />,
		// },
		// {
		// 	path: "/about",
		// 	element: <PageAbout />,
		// },
		// {
		// 	path: "/products",
		// 	element: <ProductCollection />,
		// },
		// {
		// 	path: "/product/:id",
		// 	element: <ProductDetailPage />,
		// },
		// {
		// 	path: "/cart",
		// 	element: <Cart />,
		// },
		{
			path: "/",
			element: <ViewProfile />,
		},
		{
			path: "/profile",
			element: <ViewProfile />,
		},
		{
			path: "/@/:profileId",
			element: <ViewProfile />,
		},
		{
			path: "/profile/:profileId",
			element: <ViewProfile />,
		},
		{
			path: "*",
			element: <Page404 />,
		},
	],
};

const ProtectedRoutes = {
	path: "/",
	element: <Layout restricted />,
	children: [
		// {
		// 	path: "/checkout",
		// 	element: <CheckoutPage />,
		// },
		// {
		// 	path: "/account",
		// 	element: <Account />,
		// },
		// {
		// 	path: "/profiles",
		// 	element: <ListProfiles />,
		// },
		// {
		// 	path: "/profile/:profileId",
		// 	element: <ViewProfile />,
		// },
		// {
		// 	path: "/profile/edit/:profileId",
		// 	element: <EditProfile />,
		// },
		// {
		// 	path: "/account/change-password",
		// 	element: <AccountPass />,
		// },
		// {
		// 	path: "/account/savelists",
		// 	element: <AccountSavelists />,
		// },
		// {
		// 	path: "/account/address",
		// 	element: <AccountAddress />,
		// },
		// {
		// 	path: "/orders",
		// 	element: <Orders />,
		// },
	],
};

const LoginRoutes = {
	path: "/",
	element: <Layout redirect />,
	children: [
		// {
		// 	path: "/login",
		// 	element: <Login />,
		// },
		// {
		// 	path: "/signup",
		// 	element: <PageSignUp />,
		// },
	],
};

export default function ThemeRoutes() {
	return useRoutes([PublicRoutes, LoginRoutes, ProtectedRoutes]);
}
