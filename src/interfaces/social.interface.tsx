export enum SOCIAL_TYPES {
	WHATSAPP = "WHATSAPP",
	FACEBOOK = "FACEBOOK",
	TWITTER = "TWITTER",
	VIMEO = "VIMEO",
	INSTAGRAM = "INSTAGRAM",
}

export interface SocialButtonInterface {
	name: SOCIAL_TYPES;
	link: string;
}
