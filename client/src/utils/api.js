import axios from "axios";

const api = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_SERVER_API,
    data: [],
  });
};

export default api;
