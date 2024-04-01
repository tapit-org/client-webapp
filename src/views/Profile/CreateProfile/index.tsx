import {
	AddCircleOutlineOutlined,
	AlternateEmailOutlined,
	Label,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import Heading from "components/Heading/Heading";
import {
	PROFILE_THEMES,
	ProfileListItemInterface,
} from "interfaces/profile.interface";
import { FC, useState } from "react";
import { createProfile } from "services/profile.service";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import ThemeSelector from "./ThemeSelector";
import { useSelector } from "react-redux";

interface CreateProfileProps {
	callback?: (createdProfile: ProfileListItemInterface) => void;
}
const CreateProfile: FC<CreateProfileProps> = ({ callback }) => {
	const user = useSelector((state: any) => state.user);
	const [newProfileId, setNewProfileId] = useState("");
	// const [newProfileName, setNewProfileName] = useState("");
	// const [selectedTheme, setSelectedTheme] = useState(PROFILE_THEMES.DEFAULT);
	const [errorText, setErrorText] = useState("");
	const handleCreateProfile = async () => {
		const response = await createProfile(newProfileId, user.name);
		if (response.status == 409) {
			setErrorText(
				"Profile URL is already taken! Please choose another one.",
			);
			return;
		}
		console.log(response);
		if (callback) callback(response);
	};
	return (
		<Stack spacing={3} direction={"column"}>
			<Heading
				className="text-neutral-900 dark:text-neutral-50"
				rightDescText=""
			>
				Let&apos;s get you a new profile!
			</Heading>
			<Stack direction={"column"} spacing={2}>
				<Stack direction={"column"} spacing={1}>
					<Input
						id="profile-id"
						type="text"
						name="profile-id"
						value={`tap-it.in/@/${newProfileId}`}
						onChange={(e) =>
							setNewProfileId(
								e.target.value
									.toLowerCase()
									.replace(" ", "")
									.replace("tap-it.in/@/", ""),
							)
						}
						placeholder="Enter Profile Link"
					/>
					{errorText ? (
						<Typography
							variant="subtitle2"
							className="px-2 text-primary-500"
						>
							{errorText}
						</Typography>
					) : (
						<Typography variant="subtitle2" className="px-2">
							This link will be linked to your product.
						</Typography>
					)}
				</Stack>
				{/* <Input
					id="profile-name"
					type="text"
					name="profile-id"
					value={newProfileName}
					onChange={(e) => setNewProfileName(e.target.value)}
					placeholder="Enter Name"
				/>
				<ThemeSelector
					onSelect={(theme: PROFILE_THEMES) =>
						setSelectedTheme(theme)
					}
					selectedTheme={PROFILE_THEMES.DEFAULT}
				/> */}
			</Stack>

			<ButtonPrimary onClick={handleCreateProfile}>
				Create Profile
			</ButtonPrimary>
		</Stack>
	);
};

export default CreateProfile;
