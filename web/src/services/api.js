import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apitest.viniciusgnandt.com.br',
});

export default api;