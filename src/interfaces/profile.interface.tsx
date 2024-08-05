import { SocialButtonInterface } from "./social.interface";

export enum PROFILE_THEMES {
	DEFAULT = "DEFAULT",
	DARK = "DARK",
	THEME3 = "THEME3",
}

export enum PROFILE_ICON_PACKS {
	DEFAULT = "DEFAULT",
	ROUNDED = "ROUNDED",
}
export enum PROFILE_STATUS {
	UNLINKED = "UNLINKED",
	DRAFT = "DRAFT",
	PUBLIC = "PUBLIC",
	PRIVATE = "PRIVATE",
}

export enum CONTACT_BUTTON_TYPES {
	EMAIL = "email",
	WEBSITE = "website",
	PHONE = "phone",
	MAPLINK = "maplink",
	VCARD = "vcard",
}

export interface ProfileListItemInterface {
	id: string;
	profileName: string;
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

export interface ImageInterface {
	filename: string | null;
	url: string | null;
}

export interface ProfileInterface {
	id: string;
	profileName: string;
	status: PROFILE_STATUS;
	uid: string;
	name: string;
	title: string | null;
	company: string | null;
	phone: string | null;
	email: string | null;
	mapLink: string | null;
	socials: SocialButtonInterface[];
	about: string | null;
	theme: PROFILE_THEMES;
	iconPack: PROFILE_ICON_PACKS;
	profileImage: ImageInterface | null;
	coverImage: ImageInterface | null;
	visibleButtons: CONTACT_BUTTON_TYPES[];
	vcard: string | null;
	customButton: any;
	createdAt: Date;
	updatedAt: Date;
}
