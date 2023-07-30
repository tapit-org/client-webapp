enum USER_TYPES {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

export interface UserInterface {
	uid: string;
	email: string;
	name: string;
	image?: string;
	type: USER_TYPES;
}

export const createUser = async (uid: string, userData: any) => {
	// Axios call to backend
	console.log(uid, userData);
};

export const getUser = async (uid: string) => {
	// Axios call to backend
	const user: UserInterface = {
		uid: uid,
		email: 'testtest@gmail.com',
		name: 'Test User',
		image: '',
		type: USER_TYPES.USER,
	};
	return user;
};
