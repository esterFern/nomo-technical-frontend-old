import axios from "axios";
import { API_BASE_URL } from "Constants";

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

export const putRequest = (url, data = null) => {
  return axios.put(`${API_BASE_URL}${url}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteRequest = (url, data = null) => {
  return axios.delete(
    `${API_BASE_URL}${url}`,
    { data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
