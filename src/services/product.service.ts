import axios, { API_URL } from "axios.config";

import {
	ProductInterface,
	ProductListItemInterface,
	ProductReviewInterface,
} from "interfaces/product.interface";
import toast from "react-hot-toast";

export const getProductList = async () => {
	const response = await axios.get(`${API_URL}/products`);
	console.log("Getting Products", response);
	const productList: ProductListItemInterface[] = response.data;
	return productList;
};

export const getProduct = async (id: string) => {
	// Axios call to backend
	const response = await axios.get(`${API_URL}/products/${id}`);
	console.log("Getting Product", response);
	const product: ProductInterface = response.data;
	return product;
};

export const getProductReviews = async (
	id: String,
): Promise<ProductReviewInterface[]> => {
	const response = await axios.get(`${API_URL}/products/${id}/reviews`);
	const reviews: ProductReviewInterface[] = response.data;
	return reviews;
};

export const createProductReview = async (id: String, data: any) => {
	try {
		const response = await axios.post(
			`${API_URL}/products/${id}/reviews`,
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
