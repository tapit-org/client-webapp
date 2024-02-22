import {
	AccessibilityNewOutlined,
	AlternateEmail,
	ArrowBackIosNewOutlined,
	ArrowForwardIosOutlined,
	BusinessOutlined,
	EmailOutlined,
	ImageOutlined,
	LinkOutlined,
	NotesOutlined,
	PersonOutlined,
	RemoveRedEye,
	ResetTvOutlined,
	RestartAltOutlined,
	SaveOutlined,
	TitleOutlined,
} from "@mui/icons-material";
import {
	Box,
	CircularProgress,
	Grid,
	Paper,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import {
	CONTACT_BUTTON_TYPES,
	PROFILE_STATUS,
	PROFILE_THEMES,
	ProfileInterface,
} from "interfaces/profile.interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile, updateProfile } from "services/profile.service";
import Input from "shared/Input/Input";
import DefaultProfileTemplate from "../templates/Default";
import Nav from "shared/Nav/Nav";
import NavItem2 from "components/NavItem2";
import Textarea from "shared/Textarea/Textarea";
import ProfileForm from "./tabs/ProfileForm";
import Images from "./tabs/Images";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ContactButtons from "./tabs/ContactButtons";
import AboutForm from "./tabs/AboutForm";
import { useMediaQuery } from "react-responsive";
import Socials from "./tabs/Socials";
import { SocialButtonInterface } from "interfaces/social.interface";
import Modal from "components/Modal";
const TAB_NAMES = {
	PROFILE_DETAILS: "Profile",
	IMAGES: "Images",
	CONTACT_BUTTONS: "Links",
	ABOUT: "About",
	SOCIALS: "Socials",
};

const EditProfile = () => {
	const isDesktop = useMediaQuery({ minWidth: 992 });

	const { profileId } = useParams();
	const [profileData, setProfileData] = useState<ProfileInterface>();
	const [updatedProfileData, setUpdatedProfileData] =
		useState<ProfileInterface>();
	const [activeTab, setActiveTab] = useState(TAB_NAMES.PROFILE_DETAILS);
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [showPreview, setShowPreview] = useState(isDesktop);
	const [showLoader, setShowLoader] = useState(true);
	const [name, setName] = useState("");
	const [title, setTitle] = useState("");
	const [company, setCompany] = useState("");
	const [about, setAbout] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [coverImage, setCoverImage] = useState("");
	const [socials, setSocials] = useState<SocialButtonInterface[]>([]);
	const [contactButtons, setContactButtons] = useState([
		{
			id: CONTACT_BUTTON_TYPES.EMAIL,
			enabled: false,
			link: "",
		},
		{
			id: CONTACT_BUTTON_TYPES.PHONE,
			enabled: false,
			link: "",
		},
		{
			id: CONTACT_BUTTON_TYPES.WEBSITE,
			enabled: false,
			link: "",
		},
	]);
	const TABS = [
		{
			name: TAB_NAMES.PROFILE_DETAILS,
			icon: <PersonOutlined fontSize="small" />,
			component: (
				<>
					<ProfileForm
						name={name}
						setName={setName}
						title={title}
						setTitle={setTitle}
						company={company}
						setCompany={setCompany}
					/>
					<AboutForm about={about} setAbout={setAbout} />
				</>
			),
		},
		{
			name: TAB_NAMES.IMAGES,
			icon: <ImageOutlined fontSize="small" />,
			component: (
				<Images
					profileImage={profileImage}
					setProfileImage={setProfileImage}
					coverImage={coverImage}
					setCoverImage={setCoverImage}
				/>
			),
		},
		{
			name: TAB_NAMES.CONTACT_BUTTONS,
			icon: <AlternateEmail fontSize="small" />,
			component: (
				<>
					<ContactButtons
						contactButtons={contactButtons}
						setContactButtons={setContactButtons}
					/>
					<Socials socials={socials} setSocials={setSocials} />
				</>
			),
		},
	];

	useEffect(() => {
		(async () => {
			setShowLoader(true);
			const response = await getProfile(profileId);
			setProfileData(response);
			initProfileProperties(response);
			setShowLoader(false);
		})();
	}, [profileId]);
	const initProfileProperties = (profileData: ProfileInterface) => {
		setName(profileData.name);
		setTitle(profileData.title);
		setCompany(profileData.company);
		setAbout(profileData.about);
		setProfileImage(profileData.profileImage);
		setCoverImage(profileData.coverImage);
		setContactButtons(profileData.contactButtons);
		setAbout(profileData.about);
	};
	const handleViewPreview = () => {
		setShowPreview(true);
	};
	const handleResetToSaved = () => {
		setUpdatedProfileData(profileData);
		initProfileProperties(profileData);
	};
	const handleUpdateProfile = async () => {
		console.log(updatedProfileData);
		console.log(name, title);
		const newProfileData: ProfileInterface = {
			uid: profileData.uid,
			profileId: profileData.profileId,
			status: PROFILE_STATUS.ACTIVE,
			name,
			title,
			company,
			socials: [],
			contactButtons: contactButtons,
			about,
			theme: PROFILE_THEMES.DEFAULT,
			profileImage: profileImage,
			coverImage: coverImage,
		};
		console.log(newProfileData);
		setShowLoader(true);
		const response = await updateProfile(newProfileData);
		console.log(response);
		setShowLoader(false);
	};
	if (showLoader)
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
							<Nav
								className="p-1 bg-white dark:bg-neutral-800 rounded-full w-full shadow-lg overflow-x-auto hiddenScrollbar"
								containerClassName="mb-6 lg:mb-6 relative flex  w-full text-sm md:text-base"
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
													setActiveTabIndex(index);
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
				<Modal
					show={showPreview}
					onCloseModalQuickView={() => setShowPreview(false)}
					position="bottom"
					padding={2}
				>
					<DefaultProfileTemplate
						name={name}
						title={title}
						company={company}
						about={about}
						profileImage={profileImage}
						coverImage={coverImage}
						contactButtons={contactButtons}
					/>
				</Modal>
			</Grid>
		</div>
	);
};

export default EditProfile;
