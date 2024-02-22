import axios from "axios";

export const HOSTED_API_URL =
	"https://tapit-api.60d2s3vplc2ba.ap-south-1.cs.amazonlightsail.com";
export const API_URL = "http://127.0.0.1:5000";
export const EXPRESS_API_URL = "http://127.0.0.1:8080/api/v1";
axios.interceptors.request.use((config) => {
	const access_token = localStorage.getItem("access_token");
	if (access_token) {
		config.headers["Authorization"] = `Bearer ${access_token}`;
		config.headers["Token"] = access_token;
	}
	console.log(config);
	return config;
});
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default axios;
