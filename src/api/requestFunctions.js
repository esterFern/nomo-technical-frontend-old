import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/";

export const getRequest = (url, data = null) => {
  let finalUrl = `${API_BASE_URL}${url}`;
  if (data) finalUrl = `${API_BASE_URL}${url}/${data}`;
  return axios.get(finalUrl);
};

export const postRequest = (url, data = null) => {
  return axios.post(`${API_BASE_URL}${url}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
