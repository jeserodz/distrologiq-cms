import axios from 'axios';
import { config } from './config';

export const api = axios.create({
  baseURL: config.API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('distrologiq.accessToken');
  config.headers['authorization'] = `Bearer ${accessToken}`;
  return config;
});
