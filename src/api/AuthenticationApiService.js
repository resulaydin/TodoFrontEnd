import { apiClient } from "./apiClient";

export const login = (token) => {
  return apiClient.get("/basicauth", {
    headers: {
      Authorization: token,
    },
  });
};

export const loginJwtAuthenticationService = (username, password) => {
  return apiClient.post("/authenticate", { username, password });
};
