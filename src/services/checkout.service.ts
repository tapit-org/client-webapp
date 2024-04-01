import { AddressInterface } from "interfaces/address.interface";
import axios, { API_URL } from "axios.config";
import { CheckoutUserInterface } from "interfaces/user.interface";
import { CheckoutItemInterface } from "interfaces/checkout.interface";

export const handleVerifyContactDetails = (
	email: string,
	phone: string,
	phoneCode: string,
) => {
	if (email && phone && phoneCode) {
		return true;
	}
	return false;
};

export const handleVerifyAddress = (address: AddressInterface) => {
	if (address) {
		let valid = true;
		Object.keys(address).forEach((key: keyof AddressInterface) => {
			if (key != "name") {
				valid = address[key] && address[key] != "";
				console.log(valid, key);
			}
		});
		return valid;
	}
	return false;
};

export const handleVerifyCheckoutItems = (checkoutItems) => {
	let verified = true;
	checkoutItems.forEach((item) => {
		if (!item.profileId || item.profileId == "") {
			verified = false;
		}
	});
	return verified;
};

export const createOrder = async (
	checkoutUser: CheckoutUserInterface,
	checkoutItems: CheckoutItemInterface[],
	shippingCost: number,
	tax: number,
) => {
	try {
		const checkoutData = {
			userData: {
				uid: checkoutUser.uid,
				name: checkoutUser.name,
				email: checkoutUser.email,
				phone: checkoutUser.phoneCode + checkoutUser.phone,
				address: checkoutUser.address,
			},
			items: checkoutItems.map((item: CheckoutItemInterface) => {
				return {
					id: item.id,
					name: item.name,
					category: item.category,
					price: item.price,
					profileId: item.profileId,
				};
			}),
			coupon: null,
			amount: checkoutItems
				.map((item) => item.price)
				.reduce((partialSum, a) => partialSum + a, 0),
			tax,
			shippingCost,
		};
		const response = await axios.post(`${API_URL}/order`, checkoutData);
		console.log(response);
		return response;
	} catch (error: any) {
		return error.response;
	}
};
