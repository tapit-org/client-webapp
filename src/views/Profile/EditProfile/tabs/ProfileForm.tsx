import {
	BusinessOutlined,
	EmailOutlined,
	PersonOutlined,
	PhoneOutlined,
	RemoveRedEye,
	TitleOutlined,
	VisibilityOffOutlined,
	VisibilityOutlined,
} from "@mui/icons-material";
import { Grid, IconButton, Stack, Tooltip } from "@mui/material";
import IconInput from "components/IconInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProfileForm = ({ data, updateData }) => {
	return (
		<form noValidate>
			{JSON.stringify(data)}
			<Grid container spacing={1} sx={{ pb: 2 }}>
				<Grid item xs={6}>
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
						name={"website"}
						value={data.website}
						setValue={(value: string) =>
							updateData("website", value)
						}
						placeholder={"Website"}
						disabled={!data.showWebsite}
						left={<BusinessOutlined fontSize="small" />}
						right={
							<Tooltip title={data.showWebsite ? "Hide" : "Show"}>
								<IconButton
									onClick={() =>
										updateData(
											"showWebsite",
											!data.showWebsite,
										)
									}
								>
									{data.showWebsite ? (
										<VisibilityOutlined fontSize="small" />
									) : (
										<VisibilityOffOutlined fontSize="small" />
									)}
								</IconButton>
							</Tooltip>
						}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={1} sx={{ pb: 2 }}>
				<Grid item xs={12} md={6}>
					<IconInput
						name={"phone"}
						value={data.phone}
						setValue={(value: string) => updateData("phone", value)}
						placeholder={"Phone Number"}
						left={<PhoneOutlined fontSize="small" />}
						disabled={!data.showPhone}
						right={
							<Tooltip title={data.showPhone ? "Hide" : "Show"}>
								<IconButton
									onClick={() =>
										updateData("showPhone", !data.showPhone)
									}
								>
									{data.showPhone ? (
										<VisibilityOutlined fontSize="small" />
									) : (
										<VisibilityOffOutlined fontSize="small" />
									)}
								</IconButton>
							</Tooltip>
						}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<IconInput
						name={"email"}
						value={data.email}
						setValue={(value: string) => updateData("email", value)}
						placeholder={"Email"}
						left={<EmailOutlined fontSize="small" />}
						disabled={!data.showEmail}
						right={
							<Tooltip title={data.showEmail ? "Hide" : "Show"}>
								<IconButton
									onClick={() =>
										updateData("showEmail", !data.showEmail)
									}
								>
									{data.showEmail ? (
										<VisibilityOutlined fontSize="small" />
									) : (
										<VisibilityOffOutlined fontSize="small" />
									)}
								</IconButton>
							</Tooltip>
						}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={1} sx={{ pb: 2 }}>
				<Grid item xs={12}>
					<ReactQuill
						placeholder="Bio..."
						style={{
							border: "1px solid #E5E7EB",
							borderRadius: 10,
							padding: 8,
						}}
						className="h-100"
						theme="snow"
						value={data.about}
						onChange={(value: string) => updateData("about", value)}
						modules={{
							toolbar: false,
						}}
					/>
				</Grid>
			</Grid>
		</form>
	);
};

export default ProfileForm;
