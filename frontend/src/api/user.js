import axios from 'axios';
import { str } from "../lib/utils";
const _RESPONSE = {
    success: false,
    message: "",
    payload: {}
}

async function register({ firstName, lastName, email, password, organization }) {
    if (!str.isValid(firstName)) {
        _RESPONSE.message = "Please enter your first name.";
        return _RESPONSE;
    }
    if (!str.isValid(lastName)) {
        _RESPONSE.message = "Please enter your last name.";
        return _RESPONSE;
    }
    if (!str.isValid(email)) {
        _RESPONSE.message = "Please enter your email.";
        return _RESPONSE;
    }
    if (!str.isValid(password)) {
        _RESPONSE.message = "Please enter your password.";
        return _RESPONSE;
    }
    if (!str.isValid(organization)) {
        _RESPONSE.message = "Please enter your organization.";
        return _RESPONSE;
    }

    try {
        return await axios.post("/user/register", { firstName, lastName, email, password, organization });
    } catch (e) {
        _RESPONSE.message = "Server Error. Please try again.";
        return _RESPONSE;
    }
}
async function login({ email, password }) {
    if (!str.isValid(email)) {
        _RESPONSE.message = "Please enter your email.";
        return _RESPONSE;
    }
    if (!str.isValid(password)) {
        _RESPONSE.message = "Please enter your password.";
        return _RESPONSE;
    }

    try {
        return await axios.post("/user/login", { email, password });
    } catch (e) {
        _RESPONSE.message = "Server Error. Please try again.";
        return _RESPONSE;
    }
}
async function logout(token) {
    if (!str.isValid(token)) {
        _RESPONSE.message = "Error logging out.";
        return _RESPONSE;
    }

    try {
        return await axios.get("/user/logout?token=" + token);
    } catch (e) {
        _RESPONSE.message = "Server Error. Please try again.";
        return _RESPONSE;
    }
}
async function verify(token) {
    if (!str.isValid(token)) {
        return false;
    }

    try {
        return await axios.get("/user/verify?token=" + token);
    } catch (e) {
        return false;
    }
}
async function remove(token) {
    if (!str.isValid(token)) {
        return false;
    }

    try {
        return await axios.delete("/user/deleteUser?token=" + token);
    } catch (e) {
        return false;
    }
}

export { register, login, logout, verify, remove }
