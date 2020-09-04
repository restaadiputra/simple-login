import api from "utils/api";
import { registerFormSanitizer } from "utils/sanitizer";

export const registerUser = (value) => {
  const data = registerFormSanitizer(value);
  return api.post('/api/user', data)
};
