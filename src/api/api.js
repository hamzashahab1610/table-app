import axios from "axios";

const api = axios.create({
	//baseURL: `https://table-project.azurewebsites.net`,
	baseURL: `http://localhost:3000`,
});

export default api;
