import axios, { API_URL } from "axios.config";

import {
	ProductInterface,
	ProductListItemInterface,
	ProductReviewInterface,
} from "interfaces/product.interface";
import toast from "react-hot-toast";

export const getProductList = async () => {
	const response = await axios.get(`${API_URL}/product`);
	console.log("Getting Products", response);
	const productList: ProductListItemInterface[] = response.data;
	return productList;
};

export const getProduct = async (id: string) => {
	// Axios call to backend
	const response = await axios.get(`${API_URL}/product/${id}`);
	console.log("Getting Product", response);
	const product: ProductInterface = response.data;
	return product;
};

export const getProductReviews = async (
	id: String,
): Promise<ProductReviewInterface[]> => {
	const response = await axios.get(`${API_URL}/product/${id}/review`);
	const reviews: ProductReviewInterface[] = response.data;
	return reviews;
};

export const createProductReview = async (id: String, data: any) => {
	try {
		console.log(data);
		const response = await axios.post(
			`${API_URL}/product/${id}/review`,
			data,
		);
		console.log(response.data);
		const reviews: any = response.data;
		return reviews;
	} catch (error) {
		toast.error(error.response.data);
		return null;
	}
};
