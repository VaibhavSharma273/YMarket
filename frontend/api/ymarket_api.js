import axios from "axios";
import { getToken, setToken, deleteToken } from '../storage/tokenStorage';

const ymarket = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
  "Content-type": "application/json"
  }
});

ymarket.interceptors.request.use(async (config) => {
  const token = await getToken('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // console.log(config);

  return config
});

ymarket.interceptors.response.use((response) => {
  if (response.data.access_token && response.data.refresh_token) {
    setToken('access', response.data.access_token);
    setToken('refresh', response.data.refresh_token);
  } else if (response.data.access) {
    setToken('access', response.data.access);
  } else if (response.data.detail === 'Successfully logged out.') { // TODO: fix, this is kind of gross
    deleteToken('access');
    deleteToken('refresh');
  }

  return response;
}, async (error) => {
  if (error.status !== 401) {
    return Promise.reject(error);
  }

  const refreshToken = await getToken('refresh');
  console.log('refresh', refreshToken);
  if (!refreshToken) {
    return Promise.reject(error); // User isn't currently logged in. Bad request.
  }

  const config = error.config;
  config._retry = true;
  ymarket.post('token/refresh', { refresh: refreshToken });

  return ymarket(config);
  });

export default ymarket;