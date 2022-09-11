import axios from "axios";
const baseurl = import.meta.env.VITE_API_URL;

const httpInstance = axios.create({
  baseURL: baseurl,
});

export default httpInstance;
