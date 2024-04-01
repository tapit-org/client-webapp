export enum USER_TYPE {
	USER = "USER",
	ADMIN = "ADMIN",
}

export enum USER_STATUS {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
}

export enum USER_SOURCES {
	AUTH = "AUTH",
	DB = "DB",
}

export interface UserInterface {
	uid: string;
	name: string;
	email: string;
	emailVerified: boolean;
	type?: USER_TYPE;
	status?: USER_STATUS;
	phoneNumber: string;
	provider: string;
	createdAt: number;
	lastLoginAt: number;
}

export interface CheckoutUserInterface {
	uid: string;
	email: string;
	name: string;
	phoneCode: string;
	phone: string;
	address: any;
}
