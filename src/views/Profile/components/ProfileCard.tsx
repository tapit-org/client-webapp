import { FC } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Box, Grid, Stack, Tooltip } from "@mui/material";
import {
	EditOutlined,
	PaletteOutlined,
	RecentActorsOutlined,
	RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { ProfileListItemInterface } from "interfaces/profile.interface";
import ProfileImagePlaceholder from "images/placeholder-profile.png";
interface ProfileCardProps {
	profileListItem: ProfileListItemInterface;
}

const ProfileCard: FC<ProfileCardProps> = ({ profileListItem }) => {
	return (
		<Box
			className="rounded-2xl bg-slate-50 m-1 p-3"
			sx={{
				flexGrow: 1,
				textAlign: {
					xs: "center",
					sm: "left",
				},
			}}
		>
			<Grid
				container
				className="px-2"
				sx={{
					alignItems: "center",
				}}
			>
				<Grid xs={12} sm={3} className="py-3">
					<img
						alt="profile"
						src={
							profileListItem.profileImage
								? profileListItem.profileImage
								: ProfileImagePlaceholder
						}
						style={{
							maxWidth: 150,
							borderRadius: "50%",
						}}
						className="w-full object-contain drop-shadow-xl rounded  m-auto"
					/>
				</Grid>
				<Grid
					xs={12}
					sm={9}
					sx={{
						paddingRight: {
							xs: 3,
							sm: 3,
						},
						paddingLeft: {
							xs: 3,
							sm: 5,
						},
					}}
				>
					{profileListItem.name && (
						<h2
							className={`text-xl md:text-2xl text-neutral-800 font-semibold`}
						>
							{profileListItem.name}
						</h2>
					)}
					<Link to={"/profile/" + profileListItem.profileId}>
						{profileListItem.profileId && (
							<span className={`block text-sm text-slate-700`}>
								@{profileListItem.profileId}
							</span>
						)}
					</Link>
					<div className="flex flex-col mt-5">
						<Stack
							direction={"row"}
							spacing={2}
							className="pb-3"
							sx={{
								margin: {
									xs: "auto",
									sm: "initial",
								},
							}}
						>
							<Tooltip title="Edit Profile">
								<Link
									to={
										"/profile/edit/" +
										profileListItem.profileId
									}
								>
									<ButtonPrimary
										className="shadow-lg"
										fontSize="text-xs"
										sizeClass="p-2"
									>
										<EditOutlined fontSize="small" />
									</ButtonPrimary>
								</Link>
							</Tooltip>
							<Tooltip title="View Profile">
								<Link
									to={"/profile/" + profileListItem.profileId}
								>
									<ButtonPrimary
										className="shadow-lg"
										fontSize="text-xs"
										sizeClass="p-2"
									>
										<RemoveRedEyeOutlined fontSize="small" />
									</ButtonPrimary>
								</Link>
							</Tooltip>
							<Tooltip title="Change Profile Template">
								<Link
									to={
										"/profile/edit/" +
										profileListItem.profileId
									}
								>
									<ButtonPrimary
										className="shadow-lg"
										fontSize="text-xs"
										sizeClass="p-2"
									>
										<PaletteOutlined fontSize="small" />
									</ButtonPrimary>
								</Link>
							</Tooltip>
							<Tooltip title="View Linked Orders">
								<Link
									to={"/orders" + profileListItem.profileId}
								>
									<ButtonPrimary
										className="shadow-lg"
										fontSize="text-xs"
										sizeClass="p-2"
									>
										<RecentActorsOutlined fontSize="small" />
									</ButtonPrimary>
								</Link>
							</Tooltip>
						</Stack>
					</div>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ProfileCard;
