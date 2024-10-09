import axios from "axios";
import { environment } from "./environment";

const axiosClient = axios.create({
  baseURL: environment.BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosClient;
