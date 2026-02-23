import axios from 'axios';

export const api = axios.create({
  // ходим в Next route handlers (same-origin)
  baseURL: '',
  withCredentials: true,
});