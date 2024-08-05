import { Box, Divider, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
	DownloadOutlined,
	EmailOutlined,
	LanguageOutlined,
	LocationOnOutlined,
	Map,
	PhoneOutlined,
	ShareOutlined,
} from "@mui/icons-material";
import { SocialButtonInterface } from "interfaces/social.interface";
import SocialIcon from "views/Profile/components/SocialIcon";
import NcImage from "shared/NcImage/NcImage";
import {
	CONTACT_BUTTON_TYPES,
	ContactButtonInterface,
	ProfileInterface,
} from "interfaces/profile.interface";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { FC } from "react";
const ACTION_ICONS = {
	WEBSITE: <LanguageOutlined fontSize="small" />,
	EMAIL: <EmailOutlined fontSize="small" />,
	PHONE: <PhoneOutlined fontSize="small" />,
	MAPLINK: <Map fontSize="small" />,
};

interface IProps {
	data: ProfileInterface;
}

const DefaultProfileTemplate: FC<IProps> = ({ data }) => {
	const getButtonLink = (type: CONTACT_BUTTON_TYPES) => {
		if (type == CONTACT_BUTTON_TYPES.EMAIL) {
			return `mailto:${data.email}`;
		} else if (type == CONTACT_BUTTON_TYPES.PHONE) {
			return `tel:+${data.phone}`;
		} else if (
			type == CONTACT_BUTTON_TYPES.WEBSITE ||
			type == CONTACT_BUTTON_TYPES.MAPLINK
		) {
			return data[type];
		}
	};
	const downloadVCard = async (e: any) => {
		e.preventDefault();
		const element = document.createElement("a");
		const file = new Blob([data.vcard], { type: "text/vcard" });
		element.href = URL.createObjectURL(file);
		element.download = "myFile.txt";
		element.download = data.profileName + ".vcf";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	};
	const renderContactButtons = (
		data: ProfileInterface,
		visibleButtons: string[],
	) => {
		return visibleButtons.map((visibleButton: any) => (
			<Tooltip title={data[visibleButton]} key={visibleButton}>
				<Link
					to={getButtonLink(visibleButton)}
					target="_blank"
					className="my-2"
				>
					{ACTION_ICONS[visibleButton.toUpperCase()]}
				</Link>
			</Tooltip>
		));
	};
	const renderSocials = (socials: SocialButtonInterface[]) => {
		return (
			<Stack
				className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar m-4 justify-items-center w-100"
				direction="row"
				justifyContent="center"
				alignItems="center"
				spacing={2}
			>
				{socials
					.filter((item) => item.enabled)
					.map((item, index) => (
						<Link className="w-10 h-10" key={index} to={item.link}>
							<SocialIcon type={item.type} />
						</Link>
					))}
			</Stack>
		);
	};
	return (
		<Box
			className="m-auto relative"
			sx={{
				maxWidth: 480,
				height: `calc(100vh - ${80}px)`,
			}}
		>
			<Grid container className="p-3">
				<div className="w-full">
					<div className="relative">
						<div>
							<NcImage
								containerClassName="relative h-0 aspect-h-9 aspect-w-16 rounded-xl overflow-hidden"
								className="w-full rounded-2xl object-cover"
								src={
									data.coverImage ? data.coverImage.url : null
								}
								alt={"cover"}
							/>
						</div>
						<div
							className="flex flex-col p-3 rounded-2xl shadow-lg bg-white  dark:bg-black mx-5 relative"
							style={{
								marginTop: -60,
								marginBottom: 0,
							}}
						>
							<Stack
								className="mt-3 mb-2"
								direction="row"
								alignItems="center"
								sx={{ minWidth: 0 }}
							>
								<div className="mx-3">
									<img
										style={{
											maxWidth: 80,
											maxHeight: 80,
										}}
										src={
											data.profileImage
												? data.profileImage.url
												: require("images/placeholder-profile.png")
										}
										className="rounded-full object-cover m-auto"
										alt="profile"
									/>
								</div>
								<div className="mx-2" style={{ minWidth: 0 }}>
									<Typography
										variant="h6"
										sx={{
											fontWeight: "bold",
										}}
										className="font-bold text-slate-900 text-xl"
									>
										{data.name}
									</Typography>
									<p className="text-slate-500 mt-0.5 text-xs">
										{data.title}
										{data.title && data.company && (
											<span>, </span>
										)}
										{data.company}
									</p>
								</div>
							</Stack>
							{!data.about && (
								<div className="m-3">
									<p
										className="text-center text-sm"
										dangerouslySetInnerHTML={{
											__html: "Hey there, this is Veer. WElcome to my profile...",
										}}
									></p>
								</div>
							)}
							<Stack
								spacing={2}
								sx={{
									p: 2,
								}}
							>
								<Grid
									container
									alignItems={"center"}
									justifyContent={"center"}
									sx={{
										px: 2,
									}}
								>
									<Grid item xs={3}>
										<img
											style={{
												maxWidth: 35,
												maxHeight: 35,
											}}
											src={
												"https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
											}
											alt="profile"
										/>
									</Grid>
									<Grid item xs={9}>
										<Stack>
											<Typography
												variant="subtitle2"
												sx={{ fontWeight: "bold" }}
											>
												Email
											</Typography>
											<Typography variant="subtitle2">
												{data.email}
											</Typography>
										</Stack>
									</Grid>
								</Grid>
								<Divider />
								<Grid
									container
									alignItems={"center"}
									justifyContent={"center"}
								>
									<Grid item xs={3}>
										<img
											style={{
												maxWidth: 40,
												maxHeight: 40,
											}}
											src={
												"https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
											}
											alt="profile"
										/>
									</Grid>
									<Grid item xs={9}>
										<Stack>
											<Typography variant="body1">
												Phone
											</Typography>
											<Typography variant="subtitle2">
												{data.phone}
											</Typography>
										</Stack>
									</Grid>
								</Grid>
							</Stack>
							{/* <Stack
								className="w-100 text-slate-600"
								alignItems="center"
								justifyContent="center"
								direction={"row"}
								spacing={2}
							>
								{data.visibleButtons &&
									renderContactButtons(
										data,
										data.visibleButtons,
									)}

								<Tooltip title="Save">
									<DownloadOutlined
										style={{ cursor: "pointer" }}
										onClick={downloadVCard}
										fontSize="small"
									/>
								</Tooltip>
							</Stack> */}
						</div>
					</div>
				</div>
			</Grid>
			<Grid container className="p-3 w-100">
				{data.customButton && (
					<Grid
						item
						xs={data.socials.length > 0 ? 4 : 12}
						className="pr-3"
					>
						<a
							target="_blank"
							href={data.customButton.link}
							rel="noreferrer"
						>
							<ButtonPrimary className="w-full p-2 m-4">
								{data.customButton.label}
							</ButtonPrimary>
						</a>
					</Grid>
				)}
				{data.socials.length > 0 && (
					<Grid
						item
						className="w-full"
						xs={data.customButton ? 8 : 12}
					>
						{renderSocials(data.socials)}
					</Grid>
				)}
			</Grid>
		</Box>
	);
};

export default DefaultProfileTemplate;
