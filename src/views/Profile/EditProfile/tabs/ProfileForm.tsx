import {
	BusinessOutlined,
	EmailOutlined,
	LocationOnOutlined,
	MapOutlined,
	NotesOutlined,
	PersonOutlined,
	PhoneOutlined,
	RemoveRedEye,
	TitleOutlined,
	VisibilityOffOutlined,
	VisibilityOutlined,
} from "@mui/icons-material";
import { Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import IconInput from "components/IconInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const VisibilityToggleButton = ({ isVisible, toggle }) => {
	return (
		<Tooltip title={isVisible ? "Hide" : "Show"}>
			<IconButton onClick={toggle}>
				{isVisible ? (
					<VisibilityOutlined fontSize="small" />
				) : (
					<VisibilityOffOutlined fontSize="small" />
				)}
			</IconButton>
		</Tooltip>
	);
};

const ProfileForm = ({ data, updateData }) => {
	const toggleButtonVisibility = (buttonType: string) => {
		if (data.visibleButtons.includes(buttonType)) {
			updateData(
				"visibleButtons",
				data.visibleButtons.filter(
					(visibleButton) => visibleButton != buttonType,
				),
			);
		} else {
			updateData("visibleButtons", [...data.visibleButtons, buttonType]);
		}
	};
	return (
		<form noValidate>
			<Grid container spacing={1} sx={{ pb: 2 }}>
				<Grid item xs={12}>
					<IconInput
						name={"name"}
						value={data.name}
						setValue={(value: string) => updateData("name", value)}
						placeholder={"Name"}
						left={<PersonOutlined fontSize="small" />}
					/>
				</Grid>

				<Grid item xs={12} md={6}>
					<IconInput
						name={"title"}
						value={data.title}
						setValue={(value: string) => updateData("title", value)}
						placeholder={"Title"}
						left={<TitleOutlined fontSize="small" />}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<IconInput
						name={"company"}
						value={data.company}
						setValue={(value: string) =>
							updateData("company", value)
						}
						placeholder={"Company"}
						left={<BusinessOutlined fontSize="small" />}
					/>
				</Grid>

				<Grid item xs={12} md={6}>
					<IconInput
						name={"phone"}
						value={data.phone}
						setValue={(value: string) => updateData("phone", value)}
						placeholder={"Phone Number"}
						left={<PhoneOutlined fontSize="small" />}
						disabled={!data.showPhone}
						right={
							<VisibilityToggleButton
								isVisible={data.visibleButtons.includes(
									"phone",
								)}
								toggle={() => toggleButtonVisibility("phone")}
							/>
						}
					>
						<PhoneInput
							disabled={!data.visibleButtons.includes("phone")}
							style={{
								height: "100%",
								width: "100%",
							}}
							defaultCountry="in"
							value={data.phone}
							onChange={(value) => updateData("phone", value)}
						/>
					</IconInput>
				</Grid>
				<Grid item xs={12} md={6}>
					<IconInput
						name={"email"}
						value={data.email}
						setValue={(value: string) => updateData("email", value)}
						placeholder={"Email"}
						left={<EmailOutlined fontSize="small" />}
						disabled={!data.visibleButtons.includes("email")}
						right={
							<VisibilityToggleButton
								isVisible={data.visibleButtons.includes(
									"email",
								)}
								toggle={() => toggleButtonVisibility("email")}
							/>
						}
					/>
				</Grid>
				<Grid item xs={12}>
					<IconInput
						name={"website"}
						value={data.website}
						setValue={(value: string) =>
							updateData("website", value)
						}
						placeholder={"Website"}
						disabled={!data.visibleButtons.includes("website")}
						left={<BusinessOutlined fontSize="small" />}
						right={
							<VisibilityToggleButton
								isVisible={data.visibleButtons.includes(
									"website",
								)}
								toggle={() => toggleButtonVisibility("website")}
							/>
						}
					/>
				</Grid>
				<Grid item xs={12} md={12}>
					<IconInput
						name={"mapLink"}
						value={data.mapLink}
						setValue={(value: string) =>
							updateData("mapLink", value)
						}
						placeholder={"Google Map Link"}
						left={<LocationOnOutlined fontSize="small" />}
						disabled={!data.visibleButtons.includes("mapLink")}
						right={
							<VisibilityToggleButton
								isVisible={data.visibleButtons.includes(
									"mapLink",
								)}
								toggle={() => toggleButtonVisibility("mapLink")}
							/>
						}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={1} sx={{ pb: 2 }}>
				<Grid item xs={12}>
					<Stack>
						<Stack direction={"row"}>
							<span className="p-2.5 inline-flex items-center rounded-tl-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
								<NotesOutlined fontSize="small" />
							</span>
							<span className="w-100 p-2.5 inline-flex items-center rounded-tr-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
								<Typography
									variant="subtitle2"
									className="px-1"
								>
									About
								</Typography>
							</span>
						</Stack>

						<ReactQuill
							style={{
								border: "1px solid #E5E7EB",
								borderRadius: "0px 0px 16px 16px",
								padding: "8px",
							}}
							placeholder="Start typing here..."
							className="h-100"
							theme="snow"
							value={data.about}
							onChange={(value: string) =>
								updateData("about", value)
							}
							modules={{
								toolbar: false,
							}}
						/>
					</Stack>
				</Grid>
			</Grid>
		</form>
	);
};

export default ProfileForm;
