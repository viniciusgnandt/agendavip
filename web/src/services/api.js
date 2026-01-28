import axios from 'axios';
import { ENV } from "../config/env";

const api = axios.create({
  baseURL: ENV.BACKEND_URL,
});

export default api;