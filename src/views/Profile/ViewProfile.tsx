import { useEffect, useState } from 'react';
import { getProfileData } from 'services/profile.service';
import { useParams } from 'react-router-dom';
import { ProfileInterface } from 'interfaces/profile.interface';
import DefaultProfileTemplate from 'views/Profile/templates/Default';

const ViewProfile = () => {
    const { username } = useParams()
    const [profileData, setProfileData] = useState(null as ProfileInterface)
    useEffect(() => {
        (async () => {
            setProfileData(await getProfileData(username))
        })();
    }, [username])
    return (
        <DefaultProfileTemplate profileData={profileData}/>
    )
};

export default ViewProfile;
