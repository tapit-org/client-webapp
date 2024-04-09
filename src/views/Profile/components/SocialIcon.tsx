import { SOCIAL_ICONS } from "interfaces/social.interface";

const SocialIcon = ({ type, size = 10 }) => {
	return (
		<img
			className={`w-${size} h-${size}`}
			alt={type}
			src={SOCIAL_ICONS[type]}
		></img>
	);
};

export default SocialIcon;
