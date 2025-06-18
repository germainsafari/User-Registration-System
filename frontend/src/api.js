import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "https://user-registration-system-13we.onrender.com";

export const registerUser = (data) =>
  axios.post(`${API_URL}/register`, data);

export const getUsers = () =>
  axios.get(`${API_URL}/users`); 