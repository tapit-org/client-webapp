import { useEffect, useState } from 'react';
import { getNewProfileData } from 'services/profile.service';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileInterface } from 'interfaces/profile.interface';
import DefaultProfileTemplate from 'views/Profile/templates/Default';
import { Grid, Paper, Stack, FormHelperText, Typography, Box } from '@mui/material';
import Label from 'components/Label/Label';
import { AlternateEmailOutlined, EmailOutlined, PersonOutlined } from '@mui/icons-material';
import Input from 'shared/Input/Input';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Heading from 'components/Heading/Heading';
import { useSelector } from 'react-redux';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
const CreateProfile = () => {
    const navigate = useNavigate()
    const [profileId, setProfileId] = useState('')
    
    const handleCreateProfile = () => {
        
    }
    return (
        <div className='container'>
            <Heading
                className="mt-8 mb-3 lg:mb-5 text-neutral-900 dark:text-neutral-50 nc-p-r-container"
                desc={"This will be your profile url  tap-it.in/@/" + profileId}
                rightDescText=""
            >
                Let&apos;s get you a profile name
            </Heading>
            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Box className="flex mb-3" sx={
                            {
                                maxWidth: 500
                            }
                        }>
                            <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                <AlternateEmailOutlined fontSize="small" />
                            </span>
                            <Input

                                id="profile-id"
                                type="text"
                                name="profile-id"
                                value={profileId}
                                className="!rounded-l-none"
                                onChange={(e) => setProfileId(e.target.value)}
                                placeholder="Enter Profile Name"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonPrimary onClick={handleCreateProfile}>
                            Create Profile
                        </ButtonPrimary>
                    </Grid>
                </Grid>
            </Box>



        </div>

    )
};

export default CreateProfile;
