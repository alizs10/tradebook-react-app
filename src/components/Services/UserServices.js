import http from "./http";

import config from './config.json';


export const UpdateProfile = (profile) => {
    return http.post(`${config["base_url"]}/api/panel/profile/update`, profile, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const SendVerificationCode = () => {
    return http.get(`${config["base_url"]}/api/panel/profile/send-verification-code`)
}

export const CheckVerificationCode = (code) => {
    return http.post(`${config["base_url"]}/api/panel/profile/check-verification-code`, JSON.stringify(code))
}

export const resetPassowrd = (passwordsArray) => {
    return http.post(`${config["base_url"]}/api/panel/profile/reset-password`, JSON.stringify(passwordsArray))
}

export const forgotPassowrd = () => {
    return http.get(`${config["base_url"]}/api/panel/profile/forgot-password`)
}
