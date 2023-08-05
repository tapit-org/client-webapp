import { AccessibilityNewOutlined, ArrowBackIosNewOutlined, ArrowForwardIosOutlined, BusinessOutlined, EmailOutlined, ImageOutlined, LinkOutlined, NotesOutlined, PersonOutlined, ResetTvOutlined, RestartAltOutlined, SaveOutlined, TitleOutlined } from "@mui/icons-material";
import { Box, Grid, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { ProfileInterface } from "interfaces/profile.interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewProfileData } from "services/profile.service";
import Input from "shared/Input/Input";
import DefaultProfileTemplate from "../templates/Default";
import Nav from "shared/Nav/Nav";
import NavItem2 from "components/NavItem2";
import Textarea from "shared/Textarea/Textarea";
import ProfileForm from "./tabs/ProfileForm";
import ImagesUploader from "./tabs/ImagesUploader";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ActionButtons from "./tabs/ActionButtons";
import AboutForm from "./tabs/AboutForm";

const TAB_NAMES = {
    PROFILE_DETAILS: 'Profile Details',
    IMAGES: 'Images',
    ACTION_BUTTONS: 'Action Buttons',
    ABOUT: 'About',
    SOCIALS: 'Socials'
}



const EditProfile = () => {
    const { username } = useParams()
    const [profileData, setProfileData] = useState(null as ProfileInterface)
    const [activeTab, setActiveTab] = useState(TAB_NAMES.PROFILE_DETAILS);
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [company, setCompany] = useState("")
    const [about, setAbout] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [actionButtons, setActionButtons] = useState([
        {
            id: 'website',
            enabled: false,
            text: '',
            link: ''
        },
        {
            id: 'email',
            enabled: false,
            text: '',
            link: ''
        },
        {
            id: 'phone',
            enabled: false,
            text: '',
            link: ''
        }
    ])
    const TABS = [
        {
            name: TAB_NAMES.PROFILE_DETAILS,
            icon: <PersonOutlined fontSize="small" />,
            component: <ProfileForm 
                name={name}
                setName={setName}
                title={title}
                setTitle={setTitle}
                company={company}
                setCompany={setCompany}
             />
        },
        {
            name: TAB_NAMES.IMAGES,
            icon: <ImageOutlined fontSize="small" />,
            component: <ImagesUploader 
                profileImage={profileImage} 
                setProfileImage={setProfileImage} 
                coverImage={coverImage} 
                setCoverImage={setCoverImage}
            />
        },
        {
            name: TAB_NAMES.ACTION_BUTTONS,
            icon: <AccessibilityNewOutlined fontSize="small" />,
            component: <ActionButtons 
                actionButtons={actionButtons} 
                setActionButtons={setActionButtons}
            />
        },
        {
            name: TAB_NAMES.ABOUT,
            icon: <NotesOutlined fontSize="small" />,
            component: <AboutForm about={about} setAbout={setAbout}/>
        },
        {
            name: TAB_NAMES.SOCIALS,
            icon: <LinkOutlined fontSize="small" />,
            // component: <ImagesUploader profileData={profileData} setProfileData={setProfileData} />
        }
    ]
    useEffect(() => {
        setProfileData((profileData: ProfileInterface) => {
            return {
                ...profileData,
                name,
                title,
                company,
                about,
                profileImage,
                coverImage,
                actionButtons
            }
        })
    }, [
        name,
        title,
        company,
        about,
        profileImage,
        coverImage,
        actionButtons
    ])
    useEffect(() => {
        (async () => {
            setProfileData(await getNewProfileData(username))
        })();
    }, [username])
    const handleChangeTabNext = () => {
        if(activeTabIndex == TABS.length - 1) {
            setActiveTab(TABS[0].name)
            setActiveTabIndex(0)
        }
        setActiveTab(TABS[activeTabIndex + 1].name)
        setActiveTabIndex(activeTabIndex + 1)
    }
    const handleChangeTabPrev = () => {
        if(activeTabIndex == 0) {
            setActiveTab(TABS[TABS.length - 1].name)
            setActiveTabIndex(TABS.length - 1)
        }
        setActiveTab(TABS[activeTabIndex - 1].name)
        setActiveTabIndex(activeTabIndex - 1)
    }
    return (
        <div className='container mt-3'>
            {profileData && <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={8}>
                    {profileImage}
                    <Paper elevation={0} className="pt-0 mt-3">
                        <Nav
                            className="p-1 bg-white dark:bg-neutral-800 rounded-full w-full shadow-lg overflow-x-auto hiddenScrollbar"
                            containerClassName="mb-6 lg:mb-6 relative flex  w-full text-sm md:text-base"
                        >
                            {TABS.map((item, index) => (
                                <NavItem2
                                    key={index}
                                    isActive={activeTab === item.name}
                                    onClick={() => {
                                        setActiveTab(item.name)
                                        setActiveTabIndex(index)
                                    }}
                                >
                                    <div className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm w-100">
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </div>
                                </NavItem2>
                            ))}
                        </Nav>
                        {profileData && TABS.filter((tab: any) => {
                            return tab.name == activeTab
                        })[0].component}
                        <Stack direction='row' spacing={1} className="mt-12" justifyContent='space-between'>
                            <Stack direction='row' spacing={1} justifyContent='flex-end'>
                                <Tooltip title={"Hello"}>
                                    <ButtonSecondary className="shadow-lg"
                                        fontSize="text-xs"
                                        sizeClass="p-3"
                                        onClick={handleChangeTabPrev}
                                    >
                                        <ArrowBackIosNewOutlined fontSize="small" />
                                    </ButtonSecondary>
                                </Tooltip>
                                <Tooltip title={TAB_NAMES[Object.keys(TAB_NAMES)[Object.keys(TAB_NAMES).indexOf(activeTab) + 1]]}>
                                    <ButtonSecondary className="shadow-lg"
                                        fontSize="text-xs"
                                        sizeClass="p-3"
                                        onClick={handleChangeTabNext}
                                    >
                                        <ArrowForwardIosOutlined fontSize="small" />
                                    </ButtonSecondary>
                                </Tooltip>
                            </Stack>
                            <Stack direction='row' spacing={1} justifyContent='flex-end'>
                                <ButtonSecondary className="shadow-lg"
                                    fontSize="text-xs"
                                    sizeClass="p-3">
                                    <RestartAltOutlined />
                                </ButtonSecondary>
                                <ButtonPrimary className="shadow-lg"
                                    fontSize="text-xs"
                                    sizeClass="p-3">
                                    <SaveOutlined />
                                </ButtonPrimary>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <DefaultProfileTemplate profileData={profileData} />
                </Grid>
            </Grid>
            }
        </div>
    )
};

export default EditProfile;
