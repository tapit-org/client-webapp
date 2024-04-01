// material-ui
import { Button, Stack } from "@mui/material";

// assets
import googleSvg from "images/Google.svg";

import { auth } from "firebaseConfig";
import {
	signInWithPopup,
	GoogleAuthProvider,
	User,
	deleteUser,
} from "firebase/auth";
import toast from "react-hot-toast";
import { useState } from "react";
import useLoader from "hooks/useLoader";
import useBoolState from "hooks/useBoolState";
import { createUser, getUser } from "services/auth.service";
import { dispatch } from "store";
import { UserInterface } from "interfaces/user.interface";
import { useNavigate } from "react-router-dom";
import OverlayLoader from "components/OverlayLoader";
import { handleShowErrorToast } from "services/notification.service";
// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const provider = new GoogleAuthProvider();
const FirebaseSocial = () => {
	const navigate = useNavigate();
	const [showLoader, toggleShowLoader] = useBoolState(false);
	const googleHandler = async () => {
		try {
			toggleShowLoader();
			const firebaseRespose = await signInWithPopup(auth, provider);
			const accessToken = await firebaseRespose.user.getIdToken();
			localStorage.setItem("access_token", accessToken);
			let user: UserInterface = await getUser();
			if (!user) {
				user = await createUser(dispatch, firebaseRespose.user);
			}
			toggleShowLoader();
			navigate("/");
		} catch (error) {
			handleShowErrorToast("Something went wrong - " + error.code);
			toggleShowLoader();
		}
	};

	return (
		<Stack direction="row">
			{showLoader && <OverlayLoader />}
			<Button
				className="border-2 border-primary-500"
				variant="outlined"
				color="primary"
				fullWidth
				startIcon={
					<img className="mx-2" src={googleSvg} alt="Google" />
				}
				onClick={googleHandler}
			>
				Continue with Google
			</Button>
		</Stack>
	);
};

export default FirebaseSocial;
