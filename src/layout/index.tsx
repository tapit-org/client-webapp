import Header from "components/Header/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import toast, { Toaster } from "react-hot-toast";
import { useCallback, useContext, useEffect, useState } from "react";
import { dispatch } from "store";
import { initCart } from "store/reducers/cart";
import { FirebaseAuthContext } from "FirebaseAuthProvider";
import { createUser, getUser } from "services/auth.service";
import { initUser, removeUser, setUser } from "store/reducers/user";
import { Box, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { User, deleteUser } from "@firebase/auth";
import { UserInterface } from "interfaces/user.interface";
import OverlayLoader from "components/OverlayLoader";
import { auth } from "firebaseConfig";

// ==============================|| MINIMAL LAYOUT ||============================== //

const Layout = ({ restricted = false, redirect = false }) => {
	const loaders = useSelector((state: any) => state.loaders.loaders);

	return (
		<>
			{loaders.length != 0 && <OverlayLoader />}
			<Toaster />
			<ScrollToTop />
			<Header />
			<Outlet />
		</>
	);
};

export default Layout;
