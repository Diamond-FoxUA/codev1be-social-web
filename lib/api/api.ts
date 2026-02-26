import axios from 'axios';
console.log('DEBUG: API_URL is', process.env.NEXT_PUBLIC_API_URL);
export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

nextServer.interceptors.response.use(

  response => response,

  error => {

    if (error.response?.status === 401) {

      return Promise.resolve({
        data: null,
      });

    }

    return Promise.reject(error);

  }

);