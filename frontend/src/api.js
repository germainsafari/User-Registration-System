import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const registerUser = (data) =>
  axios.post(`${API_URL}/register`, data);

export const getUsers = () =>
  axios.get(`${API_URL}/users`); 