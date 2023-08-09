import axios from "axios";
import { apiClient } from "./apiClient";

// Burası farklı bir component olarak yazıldı ve buray
// çağrıldı
// const apiClient = axios.create({
//   baseURL: "http://localhost:8080",
// });

export const HelloWorldPathVariable = (username) => {
  return apiClient.get(`/hello-world/path-variable/${username}`);
};

export const getUserTodos = (username, token) => {
  return apiClient.get(`/users/${username}/todos`);
};
export const retrieveUserTodo = (username, id) => {
  return apiClient.get(`/users/${username}/todos/${id}`);
};
export const deleteUserTodo = (username, id) => {
  return apiClient.delete(`/users/${username}/todos/${id}`);
};
export const updateUserTodo = (username, body) => {
  return apiClient.put(`/users/${username}/todos`, body);
};
export const addUserTodo = (username, body) => {
  console.log(username);
  return apiClient.post(`/users/${username}/todos`, body);
};

// AuthenticationApiService sınıfına taşındı
// export const login = (token) => {
//   return apiClient.get("/basicauth", {
//     headers: {
//       Authorization: token,
//     },
//   });
// };
