import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from 'firebaseConfig';
import { getUser } from 'services/auth.service';
import { useDispatch } from 'react-redux';
import { setUser, removeUser } from 'store/reducers/user';
import useLoader from 'hooks/useLoader';

const AuthWrapper = ({ children, restricted, redirect }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showLoader, setShowLoader] = useState(false);
	const location = useLocation();
	useLoader('auth_change', showLoader);
	useEffect(() => {
		console.log('Here', location);
		onAuthStateChanged(auth, (user) => {
			console.log('Her2', user);
			if (user) {
				console.log('Here4', user);
				const uid = user.uid;
				(async () => {
					setShowLoader(true);
					dispatch(setUser(await getUser(uid)));
					if (redirect) navigate('/');
					setShowLoader(false);
				})();
			} else {
				console.log('Here3');
				setShowLoader(true);
				dispatch(removeUser());
				if (restricted) navigate('/login');
				setShowLoader(false);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return children;
};

export default AuthWrapper;
