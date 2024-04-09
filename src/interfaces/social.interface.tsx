import facebookLogo from "images/socials/facebook.svg";
import twitterLogo from "images/socials/twitter.svg";
import whatsappLogo from "images/socials/whatsapp.svg";
import vimeoLogo from "images/socials/vimeo.svg";
import telegramLogo from "images/socials/telegram.svg";
import youtubeLogo from "images/socials/youtube.svg";

export enum SOCIAL_TYPES {
	WHATSAPP = "WHATSAPP",
	FACEBOOK = "FACEBOOK",
	TWITTER = "TWITTER",
	VIMEO = "VIMEO",
}

export const SOCIAL_TYPE_LIST = Object.values(SOCIAL_TYPES);

export const SOCIAL_ICONS = {
	FACEBOOK: facebookLogo,
	TWITTER: twitterLogo,
	WHATSAPP: whatsappLogo,
	VIMEO: vimeoLogo,
	TELEGRAM: telegramLogo,
	YOUTUBE: youtubeLogo,
};

export interface SocialButtonInterface {
	type: SOCIAL_TYPES;
	link: string;
	enabled: boolean;
}
