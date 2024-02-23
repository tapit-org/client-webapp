import { useEffect, useState } from "react";
import { getProfile } from "services/profile.service";
import { useParams } from "react-router-dom";
import { ProfileInterface } from "interfaces/profile.interface";
import DefaultProfileTemplate from "views/Profile/templates/Default";

const ViewProfile = () => {
	console.log("Loading");
	const params = useParams();
	const profileId = params.profileId || "tapit";
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
				socials={profileData.socials}
			/>
		);
};

export default ViewProfile;
