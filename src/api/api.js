import axios from "axios";

const api = axios.create({
	baseURL: `https://table-project.azurewebsites.net/api`,
	//baseURL: `http://localhost:3000/api`,
});

export default api;
