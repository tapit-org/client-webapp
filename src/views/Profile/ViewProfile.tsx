import { useEffect, useState } from "react";
import { getProfile } from "services/profile.service";
import { useParams } from "react-router-dom";
import { ProfileInterface } from "interfaces/profile.interface";
import DefaultProfileTemplate from "views/Profile/templates/Default";

const ViewProfile = () => {
	console.log("Loading");
	const { profileId } = useParams();
	const [profileData, setProfileData] = useState(null as ProfileInterface);
	useEffect(() => {
		(async () => {
			setProfileData(await getProfile(profileId));
		})();
	}, [profileId]);
	if (profileData)
		return (
			<DefaultProfileTemplate
				name={profileData.name}
				title={profileData.title}
				company={profileData.company}
				about={profileData.about}
				profileImage={profileData.profileImage}
				coverImage={profileData.coverImage}
				contactButtons={profileData.contactButtons}
				profileId={undefined}
				socials={undefined}
				vcard={undefined}
			/>
		);
};

export default ViewProfile;
