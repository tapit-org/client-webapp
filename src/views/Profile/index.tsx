import { useEffect, useId, useState } from "react";
import { getProfileCardList } from "services/profile.service";
import { ProfileListItemInterface } from "interfaces/profile.interface";
import { useSelector } from "react-redux";
import { UserInterface } from "interfaces/user.interface";
import ProfileList from "./components/ProfileList";

const ListProfiles = () => {
	const user: UserInterface = useSelector((state: any) => state.user);
	const [showLoader, setShowLoader] = useState(true);
	const [profileList, setProfileList] = useState(
		[] as ProfileListItemInterface[],
	);
	useEffect(() => {
		const handleFetchProfiles = async (uid: string) => {
			setShowLoader(true);
			setProfileList(await getProfileCardList(user.uid));
			setShowLoader(false);
		};
		if (user && user.uid) {
			handleFetchProfiles(user.uid);
		}
	}, [user]);

	return (
		<div className="container">
			<div className="mt-14 sm:mt-20">
				<div>
					<div className="max-w-2xl">
						<h2 className="text-3xl xl:text-4xl font-semibold">
							Profiles
						</h2>
					</div>
					<hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>
					<div className="mt-6">
						<ProfileList
							profileList={profileList}
							showLoader={showLoader}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListProfiles;
