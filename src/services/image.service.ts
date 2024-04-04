import axios, { API_URL } from "axios.config";
const dataURLtoBlob = (dataURL) => {
	const arr = dataURL.split(",");
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
};

export const getImageList = async (type: "profile" | "cover") => {
	const response = await axios.get(`${API_URL}/image/list/${type}`);
	console.log(response);
	return response.data;
};

export const uploadImage = async (
	base64Image: string,
	filename: string,
	type: "profile" | "cover",
) => {
	// Axios call to backend
	try {
		const formData = new FormData();
		formData.append("image", dataURLtoBlob(base64Image));
		formData.append("filename", filename);
		const response = await axios.post(
			`${API_URL}/image/upload/${type}`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);
		console.log("Test", response);
		return response.data;
	} catch (error: any) {
		return error.response;
	}
};

export const deleteImage = async (
	filename: string,
	type: "profile" | "cover",
) => {
	// Axios call to backend
	try {
		console.log(
			filename,
			type,
			`${API_URL}/image/delete/${filename}/${filename}`,
		);
		const response = await axios.delete(
			`${API_URL}/image/delete/${type}/${filename}`,
		);
		console.log(response);
		return response.data.signedUrl;
	} catch (error: any) {
		return error.response;
	}
};

export const convertHeic = async (imageFile, filename) => {
	try {
		const formData = new FormData();
		formData.append("image", imageFile);
		formData.append("filename", filename);
		const response = await axios.post(
			`${API_URL}/image/convert/heic`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);
		return response.data;
	} catch (error: any) {
		return error.response;
	}
};
