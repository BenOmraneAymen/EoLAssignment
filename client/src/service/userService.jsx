import axios from "axios";
const url = "http://localhost:4000";

export async function login(email, password) {
  return await axios.post(`${url}/auth/login`, { email, password });
}

export function getUserById(id) {
  return axios.get(`${url}/auth/${id}`);
}

export function getAllUsers() {
  return axios.get(`${url}/auth`);
}

export function createUser(user) {
  return axios.post(`${url}/auth`, user);
}

export function updateUser(id, user) {
  return axios.put(`${url}/auth/${id}`, user);
}

export function deleteUser(id) {
  return axios.delete(`${url}/auth/${id}`);
}
