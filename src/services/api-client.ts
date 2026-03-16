import axios from 'axios';

const API_URL =
  import.meta.env.PROD || !import.meta.env.VITE_ENABLE_MOCK_API
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_MOCK_API_PREFIX;

const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // set true only if the API uses cookies
});

API.interceptors.request.use(
  (config) => {
    // Attach auth token from storage
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default API;
