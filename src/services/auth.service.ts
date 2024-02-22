import axios, { API_URL } from "axios.config";
import { UserInterface } from "interfaces/user.interface";

import { User, deleteUser } from "firebase/auth";
import {
	endCreatingUser,
	setUser,
	startCreatingUser,
} from "store/reducers/user";
import { auth } from "firebaseConfig";

export const createUserObject = (firebaseUser: User, name: string) => {
	const firebaseUserJson = firebaseUser.toJSON() as any;
	const userObject = {
		uid: firebaseUserJson.uid,
		name: firebaseUserJson.displayName || name,
		email: firebaseUserJson.email,
		emailVerified: firebaseUserJson.emailVerified,
		phoneNumber: firebaseUserJson.phoneNumber || "",
		createdAt: firebaseUserJson.createdAt,
		lastLoginAt: firebaseUserJson.lastLoginAt,
		provider: firebaseUserJson.providerData[0].providerId,
	};
	return userObject;
};

export const createUser = async (
	dispatch,
	firebaseUser: User,
	name: string = "",
) => {
	// Axios call to backend
	console.log("Calling this");
	try {
		dispatch(startCreatingUser());
		const response = await axios.post(
			`${API_URL}/users`,
			createUserObject(firebaseUser, name),
		);
		const user: UserInterface = response.data;
		dispatch(endCreatingUser());
		return user;
	} catch (error) {
		deleteUser(auth.currentUser);
		dispatch(endCreatingUser());
		console.log(error);
		return null;
	}
};

// const handleCreateUser = async (firebaseUser: User) => {
//     try {
//         const user: UserInterface = await createUser(
//             firebaseUser.uid,
//             firebaseUser.displayName,
//             firebaseUser.email,
//         );
//         console.log(user);
//         dispatch(setUser(user));
//         toast.success("Account Created!");
//     } catch (error) {
//         deleteUser(firebaseUser);
//         console.log(error);
//         toast.error("Something went wrong, please try again.");
//     }
// };
export const getUser = async () => {
	try {
		const response = await axios.get(`${API_URL}/user`);
		const user: UserInterface = response.data;
		return user;
	} catch (err: any) {
		console.log(err);
		return null;
	}
};
