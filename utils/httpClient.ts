import axios from 'axios';

axios.defaults.baseURL = 'https://api.escuelajs.co/api/v1';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const get = async <T>(url: string) => {
  const response = await axios.get<T>(url);
  return response.data;
};

export const post = async <T>(url: string, data: any, config = {}) => {
  const response = await axios.post<T>(url, data, config);
  return response.data;
};

export const put = async <T>(url: string, data: any, config = {}) => {
  const response = await axios.put<T>(url, data, config);
  return response.data;
};

export const del = async (url: string, config = {}) => {
  await axios.delete(url, config);
};
