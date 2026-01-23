import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: 'https://apitest.viniciusgnandt.com.br/' || BACKEND_URL,
});

export default api;