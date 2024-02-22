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
	shipping: number,
	tax: number,
) => {
	try {
		const order = {
			amount:
				checkoutItems
					.map((item) => item.price)
					.reduce((partialSum, a) => partialSum + a, 0) +
				shipping +
				tax,
			coupon: "",
			email: checkoutUser.email,
			invoiceId: "",
			items: checkoutItems.map((item: CheckoutItemInterface) => {
				return {
					id: item.id,
					name: item.name,
					category: item.category,
					price: item.price,
					profileId: "veer",
					// profileId: item.profileId
				};
			}),
			name: checkoutUser.name,
			paymentId: "",
			phone: checkoutUser.phone,
			phoneCode: checkoutUser.phoneCode,
			status: "PENDING",
			uid: checkoutUser.uid,
			address: checkoutUser.shippingAddress,
		};
		console.log(order);
		const response = await axios.post(`${API_URL}/orders`, order);
		console.log(response);
		return response;
	} catch (error: any) {
		return error.response;
	}
};
