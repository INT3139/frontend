import ky from 'ky';

const API_URL =
  import.meta.env.PROD || import.meta.env.VITE_ENABLE_MOCK_API !== 'true'
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_MOCK_API_PREFIX;

const apiClient = ky.create({
  prefixUrl: `${API_URL}/`, // https://github.com/sindresorhus/ky?tab=readme-ov-file#baseurl
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('access_token');

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});

export default apiClient;
