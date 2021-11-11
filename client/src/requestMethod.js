import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

let TOKEN = ""
const state = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;

if (state) {
  TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

console.log(TOKEN);

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
