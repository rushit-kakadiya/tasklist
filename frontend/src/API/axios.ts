import axios, { AxiosResponse, isAxiosError } from 'axios';
axios.defaults.baseURL = 'http://localhost:4000/api/v1';

function authHeader() {
  let token = localStorage.getItem('token') as string;
  const headers = { Authorization: `Bearer ${token}` };
  return headers;
}

export const axiosAPI = async (method = 'get', endpoint: string = '', data = {}, withHeader = false) => {
  try {
    const headers = authHeader();
    let res: AxiosResponse;
    if (withHeader) {
      res = await axios({
        method,
        url: endpoint,
        data,
        headers,
      });
    } else {
      res = await axios({ method, url: endpoint, data });
    }
    return res.data;
  } catch (error) {
    let message;
    if (isAxiosError(error) && error.response) {
      message = error.response.data.message;
    } else message = String(error);
    throw new Error(message);
  }
};
