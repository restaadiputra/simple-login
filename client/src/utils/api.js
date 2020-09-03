import axios from "axios";

const api = () => {
  return axios.create({
    baseURL: "http://localhost:8000",
    data: [],
  });
};

export default api;
