import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const nextServer = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});
