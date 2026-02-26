import axios from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

nextServer.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      return Promise.resolve({
        data: null,
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config: error.config,
      });
    }

    return Promise.reject(error);
  },
);
