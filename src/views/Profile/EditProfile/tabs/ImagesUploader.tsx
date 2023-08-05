import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import NcImage from "shared/NcImage/NcImage";
import ImageUploadButton from "views/Profile/components/ImageUploadButton";

const ImagesUploader = ({
    profileImage,
    setProfileImage,
    coverImage,
    setCoverImage,
}) => {
    const profileUploadInput = useRef<any>(null)
    const coverUploadInput = useRef<any>(null)
    const [profileImageBase64, setProfileImageBase64] = useState("");
    const [coverImageBase64, setCoverImageBase64] = useState("");
    useEffect(() => {
        if(profileImageBase64) {
            setProfileImage(profileImageBase64)
        }
    }, [profileImageBase64])
    
    useEffect(() => {
        if(coverImageBase64) {
            setCoverImage(coverImageBase64)
        }
    }, [coverImageBase64])
    return (
        <Box className='mx-0 px-0' >
            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="stretch"
            >
                <Grid item xs={12} md={4} justifyContent="center">
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2} >
                        <img
                            src={profileImageBase64 || profileImage || require("images/placeholder-profile.png")}
                            className="rounded-full object-cover m-auto w-full"
                            alt="profile"
                        />
                        <ImageUploadButton
                            label="Upload Profile Image"
                            inputRef={profileUploadInput}
                            imageBase64={profileImageBase64}
                            setImageBase64={setProfileImageBase64}
                            imageUrl={profileImage}
                            cropHeight={400}
                            cropWidth={400}
                            uploadInputId="profile-image"
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={8} justifyContent="center">
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <NcImage
                            containerClassName="w-full relative h-0 aspect-h-9 aspect-w-16 rounded-xl overflow-hidden"
                            className="w-full rounded-2xl object-cover"
                            src={coverImageBase64 || coverImage}
                        />
                        <ImageUploadButton
                            label="Upload Cover Image"
                            inputRef={coverUploadInput}
                            imageBase64={coverImageBase64}
                            setImageBase64={setCoverImageBase64}
                            imageUrl={coverImage}
                            cropHeight={400}
                            cropWidth={600}
                            uploadInputId="cover-image"
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )

};

export default ImagesUploader;
