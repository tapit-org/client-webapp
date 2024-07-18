import facebookLogo from "images/socials/facebook.svg";
import twitterLogo from "images/socials/twitter.svg";
import whatsappLogo from "images/socials/whatsapp.svg";
import vimeoLogo from "images/socials/vimeo.svg";
import telegramLogo from "images/socials/telegram.svg";
import youtubeLogo from "images/socials/youtube.svg";
import instagramLogo from "images/social/instagram.png";

import reviewsLogo from "images/socials/reviews.png";

const ICONS = {
	FACEBOOK: facebookLogo,
	TWITTER: twitterLogo,
	WHATSAPP: whatsappLogo,
	VIMEO: vimeoLogo,
	TELEGRAM: telegramLogo,
	YOUTUBE: youtubeLogo,
	INSTAGRAM: instagramLogo,
	GOOGLE_REVIEWS: reviewsLogo,
};

const SocialIcon = ({ type }) => {
	return <img alt={type} src={ICONS[type]}></img>;
};

export default SocialIcon;
