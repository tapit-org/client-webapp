import { SocialButtonInterface } from "./social.interface";

export enum PROFILE_THEMES {
	DEFAULT = "DEFAULT",
	THEME2 = "THEME2",
	THEME3 = "THEME3",
}

export enum PROFILE_STATUS {
	PENDING = "PENDING",
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
}

export enum CONTACT_BUTTON_TYPES {
	EMAIL = "EMAIL",
	WEBSITE = "WEBSITE",
	PHONE = "PHONE",
}
export interface ImageInterface {
	filename: string | null;
	url: string | null;
}
export interface ProfileListItemInterface {
	id: string;
	name: string;
	theme: PROFILE_THEMES;
	status: PROFILE_STATUS;
	profileImage?: ImageInterface;
	createdAt: number;
}

export interface ContactButtonInterface {
	id: CONTACT_BUTTON_TYPES;
	enabled: boolean;
	link: string;
	text?: string;
}

export interface ProfileInterface {
	id: string;
	uid: string;
	name: string;
	title: string;
	company: string;
	phone: string;
	phoneCode: string;
	email: string;
	website: string;
	mapLink: string;
	visibleButtons: ("phone" | "email" | "website" | "mapLink")[];
	buttonIconPack: string;
	about: string;
	vcard: string;
	socials: SocialButtonInterface[];
	socialIconPack: string;
	profileImage: ImageInterface | null;
	coverImage: ImageInterface | null;
	theme: PROFILE_THEMES;
	status: PROFILE_STATUS;
	createdAt: Date;
	updatedAt: Date;
}
