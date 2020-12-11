import axios from "axios";

const api = axios.create({
	//baseURL: `https://reqres.in/api`,
	baseURL: `http://localhost:3000`,
});

export default api;
