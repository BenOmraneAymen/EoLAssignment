import axios from "axios";
const url = "http://localhost:4000";

export function getProcessById(id) {
  return axios.get(`${url}/processes/${id}`);
}

export function getAllProcesses(type) {
  return axios.get(`${url}/processes/${type}`);
}

export function createProcess(process) {
  return axios.post(`${url}/processes`, process);
}

export function updateProcess(id, process) {
  return axios.put(`${url}/processes/${id}`, process);
}

export function deleteProcess(id) {
  return axios.delete(`${url}/processes/${id}`);
}
