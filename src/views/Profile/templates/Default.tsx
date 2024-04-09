import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
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
import { ContactButtonInterface } from "interfaces/profile.interface";
const ACTION_ICONS = {
	WEBSITE: <LanguageOutlined fontSize="small" />,
	EMAIL: <EmailOutlined fontSize="small" />,
	PHONE: <PhoneOutlined fontSize="small" />,
	MAP: <Map fontSize="small" />,
};
const DefaultProfileTemplate = ({ data }) => {
	const downloadVCard = async (e: any) => {
		e.preventDefault();
		const element = document.createElement("a");
		const file = new Blob([data.vcard], { type: "text/vcard" });
		element.href = URL.createObjectURL(file);
		element.download = "myFile.txt";
		element.download = data.id + ".vcf";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	};
	const renderContactButtons = (data: any) => {
		return data.visibleButtons.map((visibleButton: string) => {
			if (visibleButton == "phone") {
				return (
					<Tooltip title={"Phone"} key={visibleButton}>
						<Link
							to={`tel:${data.phone}`}
							target="_blank"
							className="my-2"
						>
							{ACTION_ICONS["PHONE"]}
						</Link>
					</Tooltip>
				);
			}
			if (visibleButton == "email") {
				return (
					<Tooltip title={"Email"} key={visibleButton}>
						<Link
							to={`mailto:${data.email}`}
							target="_blank"
							className="my-2"
						>
							{ACTION_ICONS["EMAIL"]}
						</Link>
					</Tooltip>
				);
			}
			if (visibleButton == "mapLink") {
				return (
					<Tooltip title={"Map"} key={visibleButton}>
						<Link
							to={`mailto:${data.email}`}
							target="_blank"
							className="my-2"
						>
							{ACTION_ICONS["MAP"]}
						</Link>
					</Tooltip>
				);
			}
			if (visibleButton == "webiste") {
				return (
					<Tooltip title={"Webiste"} key={visibleButton}>
						<Link
							to={data.website}
							target="_blank"
							className="my-2"
						>
							{ACTION_ICONS["WEBSITE"]}
						</Link>
					</Tooltip>
				);
			}
			if (visibleButton == "vcard") {
				return (
					<Tooltip title={"Save"} key={visibleButton}>
						<DownloadOutlined
							style={{ cursor: "pointer" }}
							onClick={downloadVCard}
							fontSize="small"
						/>
					</Tooltip>
				);
			}
		});
	};
	const isValidLink = (social: SocialButtonInterface) => {
		if (social.link != "") {
			return true;
		}
		return false;
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
				{socials.map((social, index) => (
					<Box key={index}>
						{isValidLink(social) ? (
							<Link key={index} to={social.link}>
								<SocialIcon type={social.type} />
							</Link>
						) : (
							<Tooltip title="Invalid Link">
								<SocialIcon type={social.type} />
							</Tooltip>
						)}
					</Box>
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
										className="font-semibold text-slate-900 text-xl"
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
							<Stack
								className="w-100 text-slate-600"
								alignItems="center"
								justifyContent="center"
								direction={"row"}
								spacing={2}
							>
								{renderContactButtons(data)}
							</Stack>
							{data.about && (
								<div className="m-3">
									<p
										className="text-center text-sm"
										dangerouslySetInnerHTML={{
											__html: data.about,
										}}
									></p>
								</div>
							)}
						</div>
					</div>
				</div>
			</Grid>
			{data.socials.length > 0 && (
				<Grid container className="p-3 w-100">
					{renderSocials(data.socials)}
				</Grid>
			)}
		</Box>
	);
};

export default DefaultProfileTemplate;
