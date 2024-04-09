import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
	LanguageOutlined,
	DragIndicatorOutlined,
	EmailOutlined,
	PhoneOutlined,
	Add,
	ArrowDropDown,
} from "@mui/icons-material";
import {
	ClickAwayListener,
	IconButton,
	Paper,
	Stack,
	Switch,
	Tooltip,
} from "@mui/material";
import DraggableList from "components/DraggableList";
import { CONTACT_BUTTON_TYPES } from "interfaces/profile.interface";
import {
	SOCIAL_TYPES,
	SOCIAL_TYPE_LIST,
	SocialButtonInterface,
} from "interfaces/social.interface";
import Input from "shared/Input/Input";
import SocialIcon from "views/Profile/components/SocialIcon";
import Popper from "@mui/base/Popper";
import { useState } from "react";
import DraggableListItem from "components/DraggableList/DraggableListItem";
import IconInput from "components/IconInput";
import VisibilityToggleButton from "components/VisibilityButton";
const ACTION_ICONS = {
	WEBSITE: <LanguageOutlined fontSize="small" />,
	EMAIL: <EmailOutlined fontSize="small" />,
	PHONE: <PhoneOutlined fontSize="small" />,
};

const SocialCard = ({ social, updateSocial, socialTypeList }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleShowSocialOptions = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};
	const open = Boolean(anchorEl);
	const popperId = `${social.type}-popper`;
	return (
		<Paper elevation={0} className="mx-0 my-2 w-full">
			<Stack direction="row" alignItems="center" spacing={1}>
				<DragIndicatorOutlined />
				<Popper
					id={popperId}
					open={open}
					anchorEl={anchorEl}
					placement={"bottom-start"}
				>
					<Paper elevation={1} sx={{ mt: 1, p: 1, maxWidth: 300 }}>
						<Stack direction={"row"} spacing={2} flexWrap={"wrap"}>
							{socialTypeList.map((socialType: string) => (
								<IconButton
									key={socialType}
									size="small"
									onClick={() =>
										updateSocial(social.type, {
											...social,
											type: socialType,
										})
									}
								>
									<SocialIcon
										key={socialType}
										type={socialType}
										size={7}
									/>
								</IconButton>
							))}
						</Stack>
					</Paper>
				</Popper>
				<IconInput
					name={social.type}
					value={social.link}
					setValue={(value: string) =>
						updateSocial(social.type, {
							...social,
							link: value,
						})
					}
					placeholder={"Website"}
					disabled={!social.enabled}
					left={
						<Stack
							direction={"row"}
							justifyContent={"center"}
							alignItems={"center"}
							spacing={0.5}
							sx={{
								position: "relative",
								minWidth: 30,
							}}
						>
							<SocialIcon type={social.type} size={7} />
							<IconButton
								size="small"
								onClick={handleShowSocialOptions}
								sx={{
									position: "absolute",
									bottom: -5,
									left: 12,
									padding: 0.5,
								}}
							>
								<ArrowDropDown
									fontSize="small"
									className="bg-primary-500 rounded-2xl text-white"
									sx={{
										fontSize: 15,
									}}
								/>
							</IconButton>
						</Stack>
					}
					right={
						<VisibilityToggleButton
							isVisible={social.enabled}
							toggle={() =>
								updateSocial(social.type, {
									...social,
									enabled: !social.enabled,
								})
							}
						/>
					}
				/>
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
	const handleUpdateSocial = (
		type: string,
		newSocial: SocialButtonInterface,
	) => {
		updateSocials(
			socials.map((social: any) => {
				if (social.type == type) {
					return {
						...newSocial,
						link: handleGetLinkFromText(
							newSocial.type,
							newSocial.link,
						),
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
			...socials,
			{
				type: SOCIAL_TYPE_LIST.filter(
					(socialType: string) =>
						!socials
							.map((social: SocialButtonInterface) => social.type)
							.includes(socialType),
				)[0],
				link: "",
				enabled: true,
			},
		]);
	};
	return (
		<div>
			<DraggableList
				items={socials}
				setItems={updateSocials}
				idKey="type"
			>
				{socials.map((social: SocialButtonInterface) => {
					return (
						<SocialCard
							key={social.type}
							social={social}
							updateSocial={handleUpdateSocial}
							socialTypeList={SOCIAL_TYPE_LIST.filter(
								(socialType) =>
									!socials
										.map(
											(social: SocialButtonInterface) =>
												social.type,
										)
										.includes(socialType),
							)}
						/>
					);
				})}
			</DraggableList>
			<Stack sx={{ py: 1 }}>
				<Stack
					className="bg-primary-50"
					alignItems={"center"}
					justifyContent={"center"}
				>
					<IconButton
						onClick={handleAddNewSocial}
						sx={{ borderRadius: 2, width: "100%" }}
					>
						<Add />
					</IconButton>
				</Stack>
				{/* <Stack
				sx={{
					p: 2,
					borderRadius: 4,
					cursor: "pointer",
					height: 100,
					minWidth: 100,
				}}
				
				alignItems={"center"}
				justifyContent={"center"}
				onClick={() => inputRef.current.click()}
			>
				<Add />
			</Stack> */}
			</Stack>
		</div>
	);
};

export default Socials;
