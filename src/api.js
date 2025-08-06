import axios from "axios";

const api = axios.create({
  baseURL: "https://make-your-burguer-api.onrender.com",
});

export default api;
