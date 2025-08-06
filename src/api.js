import axios from "axios";

const api = axios.create({
  baseURL: "https://make-your-burguer.onrender.com",
});

export default api;
