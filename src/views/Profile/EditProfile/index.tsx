import {
	AlternateEmail,
	ImageOutlined,
	PersonOutlined,
	RemoveRedEye,
	RestartAltOutlined,
	SaveOutlined,
} from "@mui/icons-material";
import { CircularProgress, Grid, Paper, Stack } from "@mui/material";
import { ProfileInterface } from "interfaces/profile.interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile, updateProfile } from "services/profile.service";
import DefaultProfileTemplate from "../templates/Default";
import Nav from "shared/Nav/Nav";
import NavItem2 from "components/NavItem2";
import ProfileForm from "./tabs/ProfileForm";
import Images from "./tabs/Images";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { useMediaQuery } from "react-responsive";
import Socials from "./tabs/Socials";
import Modal from "components/Modal";
const TAB_NAMES = {
	PROFILE_DETAILS: "Profile",
	IMAGES: "Images",
	SOCIALS: "Socials",
};

const EditProfile = () => {
	const isDesktop = useMediaQuery({ minWidth: 992 });

	const { profileId } = useParams();
	const [profileData, setProfileData] = useState<ProfileInterface>();
	const [profileDataBackup, setProfileDataBackup] =
		useState<ProfileInterface>();
	const [activeTab, setActiveTab] = useState(TAB_NAMES.PROFILE_DETAILS);
	const [showPreview, setShowPreview] = useState(false);
	const [showLoader, setShowLoader] = useState(true);
	const handleUpdateProfileData = (key, value) => {
		setProfileData((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});
	};

	const TABS = [
		{
			name: TAB_NAMES.PROFILE_DETAILS,
			icon: <PersonOutlined fontSize="small" />,
			component: (
				<>
					<ProfileForm
						data={profileData}
						updateData={handleUpdateProfileData}
					/>
				</>
			),
		},
		{
			name: TAB_NAMES.IMAGES,
			icon: <ImageOutlined fontSize="small" />,
			component: (
				<Images
					profileImage={profileData?.profileImage}
					coverImage={profileData?.coverImage}
					updateData={handleUpdateProfileData}
				/>
			),
		},
		{
			name: TAB_NAMES.SOCIALS,
			icon: <AlternateEmail fontSize="small" />,
			component: (
				<>
					<Socials
						socials={profileData?.socials}
						updateSocials={(social) =>
							handleUpdateProfileData("socials", social)
						}
					/>
				</>
			),
		},
	];
	const handleInitProfileData = async (id: string) => {
		setShowLoader(true);
		const response = await getProfile(id);
		setProfileData(response);
		setProfileDataBackup(response);
		setShowLoader(false);
	};
	useEffect(() => {
		if (profileId) {
			handleInitProfileData(profileId);
		}
	}, [profileId]);
	const handleViewPreview = () => {
		setShowPreview(true);
	};
	const handleResetToSaved = () => {
		setProfileData(profileDataBackup);
	};
	const handleUpdateProfile = async () => {
		setShowLoader(true);
		const response = await updateProfile(profileData);
		console.log(response);
		setShowLoader(false);
	};
	if (showLoader || !profileData)
		return (
			<Stack
				alignItems={"center"}
				justifyContent={"center"}
				sx={{ height: `calc(100vh - 100px)` }}
			>
				<CircularProgress />
			</Stack>
		);
	return (
		<div className="container mt-3">
			<Grid container spacing={2}>
				<Grid item xs={12} md={6} lg={8}>
					<Paper elevation={1} className="p-4 mt-3">
						<Stack spacing={1}>
							{JSON.stringify(profileData)}
							<Nav
								className="p-1 bg-white dark:bg-neutral-800 rounded-full w-full shadow-lg overflow-x-auto hiddenScrollbar"
								containerClassName="mb-4 lg:mb-4 relative flex  w-full text-sm md:text-base"
							>
								<Grid container>
									{TABS.map((item, index) => (
										<Grid item key={index} xs={4}>
											<NavItem2
												isActive={
													activeTab === item.name
												}
												onClick={() => {
													setActiveTab(item.name);
												}}
											>
												<Stack
													direction={"row"}
													spacing={1}
													textAlign={"center"}
													justifyContent={"center"}
													sx={{ px: 1 }}
												>
													{item.icon}
													<span>{item.name}</span>
												</Stack>
											</NavItem2>
										</Grid>
									))}
								</Grid>
							</Nav>
							{
								TABS.find((tab: any) => {
									return tab.name == activeTab;
								}).component
							}
							<Stack
								direction="row"
								spacing={1}
								className="mt-12"
								justifyContent="space-between"
							>
								<Stack
									direction="row"
									spacing={1}
									justifyContent="flex-end"
								>
									<ButtonSecondary
										className="shadow-lg"
										fontSize="text-xs"
										sizeClass="p-3"
										onClick={handleResetToSaved}
									>
										<RestartAltOutlined />
									</ButtonSecondary>
								</Stack>
								<Stack
									direction="row"
									spacing={1}
									justifyContent="flex-end"
								>
									{!isDesktop && (
										<ButtonSecondary
											className="shadow-lg"
											fontSize="text-xs"
											sizeClass="p-3"
											onClick={handleViewPreview}
										>
											<RemoveRedEye fontSize="small" />
										</ButtonSecondary>
									)}
									<ButtonPrimary
										className="shadow-lg"
										fontSize="text-xs"
										sizeClass="p-3"
										onClick={handleUpdateProfile}
									>
										<SaveOutlined />
									</ButtonPrimary>
								</Stack>
							</Stack>
						</Stack>
					</Paper>
				</Grid>
				{isDesktop && (
					<Grid item md={6} lg={4}>
						<DefaultProfileTemplate data={profileData} />
					</Grid>
				)}
				<Modal
					show={showPreview}
					onCloseModalQuickView={() => setShowPreview(false)}
					position="bottom"
					padding={2}
				>
					<DefaultProfileTemplate data={profileData} />
				</Modal>
			</Grid>
		</div>
	);
};

export default EditProfile;
