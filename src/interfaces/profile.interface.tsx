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

export interface ProfileListItemInterface {
	profileId: string;
	name: string;
	theme: PROFILE_THEMES;
	status: PROFILE_STATUS;
	profileImage?: string;
	createdAt: number;
}

export interface ContactButtonInterface {
	id: CONTACT_BUTTON_TYPES;
	enabled: boolean;
	link: string;
	text?: string;
}
export interface ProfileInterface {
	uid: string;
	profileId: string;
	status: PROFILE_STATUS;
	name: string;
	title: string | null;
	company: string | null;
	location?: string | null;
	socials?: SocialButtonInterface[];
	contactButtons: ContactButtonInterface[];
	about: string | null;
	theme: PROFILE_THEMES;
	profileImage: string | null;
	coverImage: string | null;
	vcard?: string | null;
	customButton?: any;
}
