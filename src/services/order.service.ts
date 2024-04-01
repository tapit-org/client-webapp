import axios, { API_URL } from "axios.config";

export const fetchOrderList = async (uid) => {
	const response = await axios.get(`${API_URL}/order`);
	const orderList = response.data;
	console.log(orderList);
	return orderList;
};
