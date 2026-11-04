import axios from "axios";

//This api is an axios instance that will be used to make and receive http requests from the backend
const fighterApi = axios.create({
  baseURL: "/fighters",
  headers: {
    "Content-Type": "application/json",
  },
});

const arenaApi = axios.create({
  baseURL: "/arenas",
  headers: {
    "Content-Type": "application/json",
  },
});

const scheduleApi = axios.create({
  baseURL: "/schedulefight",
  headers: {
    "Content-Type": "application/json",
  },
});

export { fighterApi, arenaApi, scheduleApi };
