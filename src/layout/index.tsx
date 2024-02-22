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
	const creatingUser = useSelector((state: any) => state.user.creating);
	const loaders = useSelector((state: any) => state.loaders.loaders);
	useEffect(() => {
		dispatch(initCart());
	}, []);
	const auth = useContext(FirebaseAuthContext);
	const user = useSelector((state: any) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		const unlisten = auth.onAuthStateChanged(async (firebaseUser: any) => {
			if (firebaseUser) {
				console.log("Generating Token");
				localStorage.setItem(
					"access_token",
					await firebaseUser.getIdToken(),
				);
				console.log("Creating user", creatingUser);
				if (!creatingUser) {
					const user = await getUser();
					if (user) {
						dispatch(setUser(user));
					} else {
						dispatch(removeUser());
						navigate("/");
					}
				}
			} else {
				dispatch(removeUser());
				localStorage.removeItem("access_token");
				if (restricted) {
					navigate("/");
				}
			}
		});
		return () => {
			console.log("Removing Auth Change Listener");
			unlisten();
		};

		// (async () => {
		// 	if (user.uid == null && user.loading == true) {
		// 		const access_token = localStorage.getItem("access_token");
		// 		if (access_token) {
		// 			console.log(auth.currentUser);
		// 			const user = await getUser();
		// 			if (user) {
		// 				dispatch(setUser(user));
		// 			} else {
		// 				dispatch(removeUser());
		// 				navigate("/");
		// 			}
		// 		} else {
		// 			dispatch(removeUser());
		// 			if (restricted) {
		// 				navigate("/");
		// 			}
		// 		}
		// 	}
		// })();
	}, [creatingUser]);
	if (!restricted || (user && user.uid)) {
		return (
			<>
				{loaders.length != 0 && <OverlayLoader />}
				<Toaster />
				<ScrollToTop />
				<Header />
				<Outlet />
			</>
		);
	}
	return (
		<Box sx={{ width: "100%" }}>
			<LinearProgress />
		</Box>
	);
};

export default Layout;
