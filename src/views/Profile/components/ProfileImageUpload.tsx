
import { Box } from "@mui/material"
import styles from "../../assets/styles/Setup.module.scss"
import Cropper from "./Cropper"
import { EditOutlined } from "@mui/icons-material"
const ProfileImageUpload = ({ imageBase64, setImageBase64, imageUrl }: any) => {
    return (
        <Box className="mx-0 px-0">
            <Cropper setImageBase64={setImageBase64} cropHeight={400} cropWidth={400} uploadInputId={"profile-upload"}/>
            <div className={styles.profileImage} style={{
                backgroundImage: `url(${imageBase64 || imageUrl || require("../../assets/images/default-profile.jpg")})`
            }}>
                <label htmlFor="profile-upload" className={styles.editButton}>
                    <EditOutlined/>
                </label>
            </div>
        </Box>
    )
}
export default ProfileImageUpload