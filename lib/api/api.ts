import axios from 'axios';
console.log('DEBUG: API_URL is', process.env.NEXT_PUBLIC_API_URL);
export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
