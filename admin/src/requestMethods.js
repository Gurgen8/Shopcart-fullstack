import axios from "axios";

const BASE_URL = "http://localhost:5000/";
 const TOKEN=
 (localStorage.getItem("persist:root")) ?
 JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.accessToken :
  false;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: TOKEN },
});
