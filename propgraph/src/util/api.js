import axios from "axios";
const BASE_URL = "localhost:8000";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {},
});

export const getProperties = (body) => {
  return instance.post("/fetch", body);
};

export const uploadProperties = (body) => {
  return instance.post("/upload", body);
};

export const predictProperty = (body) => {
  return instance.post("/predict", body);
};
