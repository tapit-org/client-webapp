import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
	LanguageOutlined,
	DragIndicatorOutlined,
	EmailOutlined,
	PhoneOutlined,
	Add,
} from "@mui/icons-material";
import { IconButton, Paper, Stack, Switch, Tooltip } from "@mui/material";
import DraggableList from "components/DraggableList";
import { CONTACT_BUTTON_TYPES } from "interfaces/profile.interface";
import { SOCIAL_TYPES } from "interfaces/social.interface";
import Input from "shared/Input/Input";

const ACTION_ICONS = {
	WEBSITE: <LanguageOutlined fontSize="small" />,
	EMAIL: <EmailOutlined fontSize="small" />,
	PHONE: <PhoneOutlined fontSize="small" />,
};

const SocialCard = ({ item, setItem, toggleItem }) => {
	return (
		<Paper elevation={1} className="my-2 mx-0 p-2 w-full">
			<Stack direction="row" alignItems="center" spacing={2}>
				<DragIndicatorOutlined />
				<div
					className="flex"
					style={{
						flexGrow: 1,
					}}
				>
					<span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
						{item.name}
					</span>
					<Input
						id="action-website"
						type="text"
						name="website"
						value={item.text}
						className="!rounded-l-none"
						onChange={(e) => setItem(item.link, e.target.value)}
						placeholder={"Enter " + item.name}
					/>
				</div>
				<Tooltip title={item.enabled ? "Hide" : "Show"}>
					<IconButton onClick={() => toggleItem(item.name)}>
						{item.enabled ? (
							<EyeSlashIcon height={20} />
						) : (
							<EyeIcon height={20} />
						)}
					</IconButton>
				</Tooltip>
			</Stack>
		</Paper>
	);
};

const Socials = ({ socials, updateSocials }) => {
	const handleGetLinkFromText = (id: string, text: string) => {
		if (id == CONTACT_BUTTON_TYPES.EMAIL) {
			return "mailto:" + text;
		} else if (id == CONTACT_BUTTON_TYPES.PHONE) {
			return "tel:" + text;
		} else {
			return text;
		}
	};
	const handleSetActionButton = (id: string, text: string) => {
		updateSocials(
			socials.map((social: any) => {
				if (social.id == id) {
					return {
						...social,
						text: text,
						link: handleGetLinkFromText(id, text),
					};
				} else {
					return social;
				}
			}),
		);
	};
	const handleToggleItem = (id: string) => {
		updateSocials(
			socials.map((social: any) => {
				if (social.id == id) {
					return {
						...social,
						enabled: !social.enabled,
					};
				} else {
					return social;
				}
			}),
		);
	};
	const handleAddNewSocial = () => {
		console.log(SOCIAL_TYPES);
		updateSocials([
			{
				name: SOCIAL_TYPES.WHATSAPP,
				link: "",
				enabled: true,
			},
			...socials,
		]);
	};
	return (
		<div>
			{JSON.stringify(socials)}
			<DraggableList items={socials} setItems={updateSocials}>
				{socials.map((social: any) => {
					return (
						<SocialCard
							key={social.name}
							item={social}
							setItem={handleSetActionButton}
							toggleItem={handleToggleItem}
						/>
					);
				})}
			</DraggableList>
			<Stack>
				<IconButton onClick={handleAddNewSocial}>
					<Add />
				</IconButton>
			</Stack>
		</div>
	);
};

export default Socials;
