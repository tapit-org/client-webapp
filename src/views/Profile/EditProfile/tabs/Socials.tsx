import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
	LanguageOutlined,
	DragIndicatorOutlined,
	EmailOutlined,
	PhoneOutlined,
	Add,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Checkbox,
	IconButton,
	Paper,
	Stack,
	Switch,
	Tooltip,
	Typography,
} from "@mui/material";
import DraggableList from "components/DraggableList";
import { CONTACT_BUTTON_TYPES } from "interfaces/profile.interface";
import { useEffect, useState } from "react";
import Input from "shared/Input/Input";
import FACEBOOK_IMG from "images/social/facebook.png";
import {
	SOCIAL_TYPES,
	SocialButtonInterface,
} from "interfaces/social.interface";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Modal from "components/Modal";
const SOCIAL_ICONS = {
	FACBOOK: <img width={30} src={FACEBOOK_IMG} alt={SOCIAL_TYPES.FACEBOOK} />,
	WHATSAPP: <img width={30} src={FACEBOOK_IMG} alt={SOCIAL_TYPES.FACEBOOK} />,
	FACEBOOK: <img width={30} src={FACEBOOK_IMG} alt={SOCIAL_TYPES.FACEBOOK} />,
	TWITTER: <img width={30} src={FACEBOOK_IMG} alt={SOCIAL_TYPES.FACEBOOK} />,
	VIMEO: <img width={30} src={FACEBOOK_IMG} alt={SOCIAL_TYPES.FACEBOOK} />,
};

const SocialButtonCard = ({ item, setItem, toggleItem }) => {
	return (
		<Stack direction={"row"} spacing={2}>
			<img width={30} src={FACEBOOK_IMG} alt={item.name} />
		</Stack>
	);
};

const Socials = ({ socials, setSocials }) => {
	useEffect(() => {
		setSocials(
			Object.keys(SOCIAL_ICONS).map((social) => {
				return {
					name: social,
					link: "",
				};
			}),
		);
	}, []);
	const handleGetLinkFromText = (id: string, text: string) => {
		if (id == CONTACT_BUTTON_TYPES.EMAIL) {
			return "mailto:" + text;
		} else if (id == CONTACT_BUTTON_TYPES.PHONE) {
			return "tel:" + text;
		} else {
			return text;
		}
	};
	const handleSetSocial = (name: string, link: string) => {
		setSocials((prev: SocialButtonInterface[]) => {
			return prev.map((social: SocialButtonInterface) => {
				if (social.name == name) {
					return {
						name: name,
						link: link,
					};
				} else {
					return social;
				}
			});
		});
	};
	const handleToggleItem = (name: string) => {
		// setContactButtons((contactButtons: any) => {
		// 	return contactButtons.map((actionButton: any) => {
		// 		if (actionButton.id == id) {
		// 			return {
		// 				...actionButton,
		// 				enabled: !actionButton.enabled,
		// 			};
		// 		} else {
		// 			return actionButton;
		// 		}
		// 	});
		// });
	};
	const [showSelectSocialModal, setShowSelectSocialModal] = useState(false);
	const handleOpenSelectSocialModal = () => {
		setShowSelectSocialModal(true);
	};
	const handleCloseSelectSocialModal = () => {
		setShowSelectSocialModal(false);
	};
	const handleAddSocial = () => {
		setSocials((prev: SocialButtonInterface[]) => [
			...prev,
			{
				name: "FACEBOOK",
				link: "",
			},
		]);
	};
	return (
		<div>
			<Modal
				show={showSelectSocialModal}
				onCloseModalQuickView={handleCloseSelectSocialModal}
				title="Select Social"
			>
				<Stack direction={"row"} spacing={2}>
					{Object.keys(SOCIAL_TYPES).map(
						(socialType: string) =>
							SOCIAL_ICONS[SOCIAL_TYPES[socialType]],
					)}
				</Stack>
			</Modal>
			<Stack direction={"row"} spacing={2}>
				<DraggableList items={socials} setItems={setSocials}>
					{socials.map((social: SocialButtonInterface) => {
						return (
							<SocialButtonCard
								key={social.name}
								item={social}
								setItem={handleSetSocial}
								toggleItem={handleToggleItem}
							/>
						);
					})}
				</DraggableList>
			</Stack>
			<IconButton onClick={handleOpenSelectSocialModal}>
				<Add />
			</IconButton>
		</div>
	);
};

export default Socials;
