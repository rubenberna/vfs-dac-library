import axios from 'axios'
import LocalStorageUtil from '../utils/localstorage.util'
import { msalAcquireTokenSilent, msalLogout } from '../utils/security.util'

export const client = axios.create({
  baseURL: 'https://vfs-dac-api-prod.azurewebsites.net/api/'
})

client.interceptors.request.use(async (config) => {
  await msalAcquireTokenSilent();
  const token = LocalStorageUtil.getAccessToken();
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

client.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      await msalAcquireTokenSilent();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageUtil.getAccessToken();
      originalRequest.headers['Authorization'] = 'Bearer ' + LocalStorageUtil.getAccessToken();
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
