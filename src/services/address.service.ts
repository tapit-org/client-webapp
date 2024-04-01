import axios, { API_URL } from "axios.config";
import { AddressInterface } from "interfaces/address.interface";

export const createAddress = async (address: AddressInterface) => {
	// Axios call to backend
	try {
		const response = await axios.post(`${API_URL}/user/address`, address);
		console.log(response);
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const getAddressList = async (uid: string) => {
	// Axios call to backend
	const response = await axios.get(`${API_URL}/user/address`);
	console.log("Getting Addresses", response);
	// const addressList: UserInterface = response.data
	// return addressList;
	return response.data;
};
