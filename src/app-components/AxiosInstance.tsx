import axios from "axios";

//This api is an axios instance that will be used to make and receive http requests from the backend
const fighterApi = axios.create({
  baseURL: "http://77.113.34.130:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

const arenaApi = axios.create({
  baseURL: "http://77.113.34.130:8082",
  headers: {
    "Content-Type": "application/json",
  },
});

const scheduleApi = axios.create({
  baseURL: "http://77.113.34.130:8083",
  headers: {
    "Content-Type": "application/json",
  },
});

export { fighterApi, arenaApi, scheduleApi };
