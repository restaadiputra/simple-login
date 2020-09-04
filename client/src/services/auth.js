import api from "utils/api";

export const login = (data) => {
  return api.post("/api/auth", data);
};
