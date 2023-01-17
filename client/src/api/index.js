import axios from 'axios'

const API = axios.create( {baseURL: "http://localhost:5000"})

const token = localStorage.getItem("token");
console.log(typeof(token))
const headers = {
    'auth_token': "break_string " + "" + JSON.stringify(token)
}

export const LOGIN = (data) => API.post("/login-check", data)
export const SIGNUP = (data) => API.post("/signup-check", data);
export const CHANGE = (data) => API.post("/change-data", data, {headers: headers});