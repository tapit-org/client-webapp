import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
	LanguageOutlined,
	DragIndicatorOutlined,
	EmailOutlined,
	PhoneOutlined,
} from "@mui/icons-material";
import { IconButton, Paper, Stack, Switch, Tooltip } from "@mui/material";
import DraggableList from "components/DraggableList";
import { CONTACT_BUTTON_TYPES } from "interfaces/profile.interface";
import Input from "shared/Input/Input";

const ACTION_ICONS = {
	WEBSITE: <LanguageOutlined fontSize="small" />,
	EMAIL: <EmailOutlined fontSize="small" />,
	PHONE: <PhoneOutlined fontSize="small" />,
};

const ActionButtonCard = ({ item, setItem, toggleItem }) => {
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
						{ACTION_ICONS[item.id]}
					</span>
					<Input
						id="action-website"
						type="text"
						name="website"
						value={item.text}
						className="!rounded-l-none"
						onChange={(e) => setItem(item.id, e.target.value)}
						placeholder={"Enter " + item.id}
					/>
				</div>
				<Tooltip title={item.enabled ? "Hide" : "Show"}>
					<IconButton onClick={() => toggleItem(item.id)}>
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

const ContactButtons = ({ contactButtons, setContactButtons }) => {
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
		setContactButtons((contactButtons: any) => {
			return contactButtons.map((actionButton: any) => {
				if (actionButton.id == id) {
					return {
						...actionButton,
						text: text,
						link: handleGetLinkFromText(id, text),
					};
				} else {
					return actionButton;
				}
			});
		});
	};
	const handleToggleItem = (id: string) => {
		setContactButtons((contactButtons: any) => {
			return contactButtons.map((actionButton: any) => {
				if (actionButton.id == id) {
					return {
						...actionButton,
						enabled: !actionButton.enabled,
					};
				} else {
					return actionButton;
				}
			});
		});
	};
	return (
		<div>
			<DraggableList items={contactButtons} setItems={setContactButtons}>
				{contactButtons.map((actionButton: any) => {
					return (
						<ActionButtonCard
							key={actionButton.id}
							item={actionButton}
							setItem={handleSetActionButton}
							toggleItem={handleToggleItem}
						/>
					);
				})}
			</DraggableList>
		</div>
	);
};

export default ContactButtons;
