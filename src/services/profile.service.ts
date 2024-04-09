import axios, { API_URL } from "axios.config";
import {
	PROFILE_THEMES,
	ProfileListItemInterface,
	ProfileInterface,
	PROFILE_STATUS,
} from "interfaces/profile.interface";

export const getProfileCardList = async (uid: string) => {
	// Axios call to backend
	const response = await axios.get(`${API_URL}/users/${uid}/profiles`);
	console.log("Getting Profiles", response);
	const profileList: ProfileListItemInterface[] = response.data;
	console.log(profileList);
	return profileList;
};

export const getProfile = async (profileId: string) => {
	console.log(`${API_URL}/profile/${profileId}`);
	const response = await axios.get(`${API_URL}/profile/${profileId}`);
	console.log("Getting Profiles", response);
	const profile: ProfileInterface = response.data;
	console.log(profile);
	return profile;
};

export const createProfile = async (
	profileId: string,
	name: string,
	theme: PROFILE_THEMES,
) => {
	try {
		const response = await axios.post(`${API_URL}/profiles`, {
			profileId,
			theme,
			name,
			status: PROFILE_STATUS.PENDING,
		});
		console.log(response);
		console.log(response.data);
		return response.data;
	} catch (error: any) {
		return error.response;
	}
};

export const updateProfile = async (profileData: ProfileInterface) => {
	try {
		const response = await axios.patch(
			`${API_URL}/profiles/${profileData.profileId}`,
			profileData,
		);
		console.log(response);
		console.log(response.data);
		return response.data;
	} catch (error: any) {
		return error.response;
	}
};
