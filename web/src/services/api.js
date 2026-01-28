import axios from 'axios';
import { getConfig } from "../config/runtimeConfig";

const config = getConfig();

const api = axios.create({
  baseURL: config.BACKEND_URL,
});

export default api;