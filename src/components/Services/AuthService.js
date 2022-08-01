import http from './http';

import config from './config.json';
import axios from 'axios';


export const registerUser = async user => {
    // delete axios.defaults.headers["Authorization"];

    return await http.get(`${config['base_url']}/sanctum/csrf-cookie`).then(async response => {
        return await http.post(`${config['base_url']}/api/register`, JSON.stringify(user));
    });
}

export const loginUser = async user => {

    return await http.get(`${config['base_url']}/sanctum/csrf-cookie`).then(async response => {
        return await http.post(`${config['base_url']}/api/login`, JSON.stringify(user));
    });

}

export const logout = async () => {
    return await http.get(`${config['base_url']}/api/logout`);
}

export const forgotPassword = async (forgotPassArr) => {
    return await http.post(`${config['base_url']}/api/forgot-password`, JSON.stringify(forgotPassArr));
}
export const resetPassword = async (resetPassArr) => {
    return await http.post(`${config['base_url']}/api/reset-password`, JSON.stringify(resetPassArr));
}

export const getUserByToken = async (token) => {
    return await http.get(`${config['base_url']}/api/user`, {
        headers: {
            Authentication: `Bearer ${token}`
        }
    });
}
