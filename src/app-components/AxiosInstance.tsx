import axios from "axios";

//This api is an axios instance that will be used to make and receive http requests from the backend
const fighterApi = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

const arenaApi = axios.create({
  baseURL: "http://localhost:8082",
  headers: {
    "Content-Type": "application/json",
  },
});

export { fighterApi, arenaApi };
