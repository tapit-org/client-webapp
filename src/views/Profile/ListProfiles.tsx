import { useEffect, useId, useState } from 'react';
import Heading from 'components/Heading/Heading';
import ProfileCard from 'components/ProfileCard';
import { ProfileCardInterface, getProfileCardList } from 'services/profile.service';
import { Box, Stack, Grid } from '@mui/material';


const ListProfiles = () => {
    const [profileList, setProfileList] = useState([] as ProfileCardInterface[])
    useEffect(() => {
        (async () => {
            console.log(await getProfileCardList())
            setProfileList(await getProfileCardList())
        })();
    }, []);

    return (
        <div className='container'>
            <Heading
                className="mt-8 mb-3 lg:mb-5 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
                desc=""
                rightDescText="Make the perfect first impression!"
            >
                Your Profiles
            </Heading>
            <Box sx={{ flexGrow: 1 }} className='mb-6'>
                <Grid container key={profileList.length}>
                    {profileList.map((item, index) => (
                        <Grid xs={12} md={6} key={index}>
                            <ProfileCard
                                username={item.username}
                                name={item.name}
                                selectedDesign={item.selectedDesign}
                                image={item.image}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default ListProfiles;
