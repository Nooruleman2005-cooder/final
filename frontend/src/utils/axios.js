import axios from 'axios';

export const authAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/products`,
});

