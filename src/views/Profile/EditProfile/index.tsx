import { Grid } from "@mui/material";
import Heading from "components/Heading/Heading";
import useLoader from "hooks/useLoader";
import CustomButton from "interfaces/custombutton.interface";
import Social from "interfaces/social.interface";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileData } from "services/profile.service";

const TABS = {
    PICTURE: "PICTURE",
    DETAILS: "DETAILS",
    SOCIALS: "SOCIALS",
    CUSTOM_BUTTONS: "CUSTOM_BUTTONS",
    PREVIEW: "PREVIEW"
}
const EditProfile = () => {
    const { username } = useParams()
    const navigate = useNavigate();
    const { user } = useSelector((state: any) => {
        return state.user
    })
    const [activeTab, setActiveTab] = useState<string>(TABS.DETAILS)
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [about, setAbout] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneCode, setPhoneCode] = useState("");
    const [location, setLocation] = useState("");
    const [socials, setSocials] = useState<Social[]>([] as Social[]);
    const [customButtons, setCustomButtons] = useState<CustomButton[]>([] as CustomButton[]);
    const [profileImageBase64, setProfileImageBase64] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState("")
    const [coverImageBase64, setCoverImageBase64] = useState("");
    const [coverImageUrl, setCoverImageUrl] = useState("")
    const [showLoader, setShowLoader] = useState(false)
    useLoader('edit_profile', showLoader)
    useEffect(() => {
        (async () => {
            if (username && user) {
                setShowLoader(true)
                const profileData = await getProfileData(username)
                if (profileData) {
                    if (profileData.uid !== user.uid) {
                        toast.error("You are not authorized to edit this profile")
                        navigate("/profiles")
                    }
                    setName(profileData.name || "")
                    setTitle(profileData.title || "")
                    setAbout(profileData.about || "")
                    setEmail(profileData.email || "")
                    setPhone(profileData.phone || "")
                    setPhoneCode(profileData.phoneCode || "")
                    setLocation(profileData.location || "")
                    setSocials(profileData.socials || [])
                    setProfileImageUrl(profileData.image || "")
                    setCoverImageUrl(profileData.coverImage || "")
                    setCustomButtons(profileData.customButtons || [])
                }
                setShowLoader(false)
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, user])
    const handleVerifyProfile = () => {
        let detailsValid = true
        console.log(phoneCode)
        // Write Validation Code again
        return detailsValid
    }

    const handleSaveProfile = async () => {

    }
    const handleSaveSocials = async () => {

    }
    const handleSaveButtons = async () => {

    }
    return (
        <div className='container'>
            <Grid>
                <Heading
                    className="mt-8 mb-3 lg:mb-14 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
                    desc=""
                    rightDescText="Let's get you all setup."
                >
                    Edit Profile
                </Heading>
            </Grid>
{/* 
            <Row>
                {cartItems.map((cartItem: CartItem, index: number) => {
                    return (
                        <Col xl="3" lg="6" md="6" key={index}>
                            <div className={`card ${styles.itemContainer} my-2`}>
                                <Row className="d-flex align-items-center w-100">
                                    <h3 className="text-bold">
                                        {getProduct(cartItem.id || '')?.name}
                                    </h3>
                                </Row>
                                <Row className="mx-0 px-0 w-100">
                                    <FormGroup>
                                        <Input
                                            className="my-2"
                                            type="select"
                                            name="profile"
                                            placeholder="Select Profile"
                                            onChange={e => { handleAddUsernameToProduct(index, e.target.value) }}
                                            value={cartItem.username}
                                        >
                                            <option value="">Select Profile</option>
                                            {profiles.map(profile => {
                                                return <option key={profile.username} value={profile.username}>{profile.username}</option>
                                            })}
                                        </Input>
                                        <div className="color-primary text-small text-bold">
                                            <button onClick={() => handleOpenProfileModal(index)} className="border-none color-primary mx-0 px-0">
                                                Create New Profile
                                            </button>
                                        </div>
                                    </FormGroup>
                                </Row>
                            </div>
                        </Col>
                    )
                })}
            </Row>
            <div className="py-4">
                <Button text={"Enter Shipping Details"} color="primary" handler={handleMoveToShipping} />
            </div> */}
        </div>
    )
};

export default EditProfile;
