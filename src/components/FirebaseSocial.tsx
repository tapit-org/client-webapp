// material-ui
import { Button, Stack } from '@mui/material';

// assets
import googleSvg from 'images/Google.svg';

import { auth } from 'firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useState } from 'react';
import useLoader from 'hooks/useLoader';
// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const provider = new GoogleAuthProvider();
const FirebaseSocial = () => {
	const [showLoader, setShowLoader] = useState(false);
	useLoader('google_login', showLoader);
	const googleHandler = async () => {
		try {
			setShowLoader(true);
			await signInWithPopup(auth, provider);
			setShowLoader(false);
		} catch (err) {
			if (err.code === 'auth/invalid-email') {
				toast.error('Please enter a valid email');
			} else if (err.code === 'auth/email-already-in-use') {
				toast.error('Email already in use');
			} else if (err.code === 'auth/weak-password') {
				toast.error('Password should be minimum 6 characters');
			} else {
				toast.error('Something went wrong');
			}
			setShowLoader(false);
		}
	};

	return (
		<Stack direction="row" sx={{ '& .MuiButton-startIcon': { mr: 1, ml: -0.5 } }}>
			<Button
				variant="outlined"
				color="secondary"
				fullWidth
				startIcon={<img src={googleSvg} alt="Google" />}
				onClick={googleHandler}
			>
				Google
			</Button>
		</Stack>
	);
};

export default FirebaseSocial;
