//const axios = require('axios')

import axios from "axios";
import { getUserData } from "./Storage";

// api url link from firebase documentation under signup with email and password
// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = "AIzaSyA3qwaAl5qmnJl-D_g9xTCc9l1KCrQsW3I";
const Register_url = `accounts:signUp?key=${API_KEY}`;
const Login_url = `accounts:signInWithPassword?key=${API_KEY}`;
const User_Details_url = `accounts:lookup?key=${API_KEY}`;

export const RegisterApi = (inputs) => {
  let data = {
    displayName: inputs.name,
    email: inputs.email,
    password: inputs.password,
  };

  //{data:data}----->data (javascript automatic correction for the axios method rule)
  // we should pass value in name of data, but we have created already a variable name as data an assinged a value to it(hover the post word below)

  return axios.post(Register_url, data);
};

export const LoginApi = (inputs) => {
  let data = {
    email: inputs.email,
    password: inputs.password,
  };

  return axios.post(Login_url, data);
};

export const userDetailsApi = () => {
  let data = { idToken: getUserData() };
  return axios.post(User_Details_url, data);
};
