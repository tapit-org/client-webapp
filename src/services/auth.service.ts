import axios, { API_URL } from "axios.config";
import { UserInterface } from "interfaces/user.interface";

import { User, deleteUser } from "firebase/auth";
import { endCreatingUser, startCreatingUser } from "store/reducers/user";
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
			`${API_URL}/user`,
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
