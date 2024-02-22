import { FC } from "react";
import ProfileCard from "views/Profile/components/ProfileCard";
import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import { ProfileListItemInterface } from "interfaces/profile.interface";
interface ProfileListProps {
	profileList: ProfileListItemInterface[];
	showLoader: boolean;
}
const ProfileList: FC<ProfileListProps> = ({ profileList, showLoader }) => {
	if (showLoader)
		return (
			<Stack alignItems={"center"}>
				<CircularProgress />
			</Stack>
		);
	if (profileList.length == 0)
		return (
			<Grid>No Profiles. Create your first order to get a profile!</Grid>
		);
	return (
		<Box sx={{ flexGrow: 1 }} className="mb-6">
			<Grid
				container
				key={profileList.length}
				justifyContent="space-between"
				alignItems="stretch"
			>
				{/* <Grid xs={12} md={6}>
									<NewProfileCard />
								</Grid> */}
				{profileList.map((item, index) => (
					<Grid xs={12} md={6} key={index}>
						<ProfileCard profileListItem={item} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default ProfileList;
