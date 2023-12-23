import axios from "axios";
const url = "http://localhost:4000";

export function getBottleById(id) {
  return axios.get(`${url}/bottles/${id}`);
}

export function getAllBottles(type) {
  return axios.get(`${url}/bottles/${type}`);
}

export function createBottle(bottle) {
  return axios.post(`${url}/bottles`, bottle);
}

export function updateBottle(id, bottle) {
  return axios.put(`${url}/bottles/${id}`, bottle);
}

export function deleteBottle(id) {
  return axios.delete(`${url}/bottles/${id}`);
}
