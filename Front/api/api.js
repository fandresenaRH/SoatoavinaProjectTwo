import axios from "axios";

const BASE_URL = "http://10.77.29.222:8000";

export const API = axios.create({
    baseURL: BASE_URL, //  backend FastAPI
    timeout: 5000, //  délai max avant erreur
  });

export { BASE_URL };