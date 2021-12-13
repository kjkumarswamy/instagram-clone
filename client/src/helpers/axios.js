import { API } from "../baseUrl";
import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API,
  headers: { authorization: token ? `Bearer ${token}` : null },
});

export default axiosInstance;
