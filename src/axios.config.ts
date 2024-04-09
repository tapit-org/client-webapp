import axios from "axios";

export const API_URL = `${process.env.REACT_APP_API_URL}/api/v1`;
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
		console.log(response);
		return response;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	},
);

export default axios;
