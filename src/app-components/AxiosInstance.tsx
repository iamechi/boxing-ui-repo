import axios from "axios";

//This api is an axios instance that will be used to make and receive http requests from the backend
const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
