import http from "./http";

import config from './config.json';

export const CreateAcc = async acc => {
    return await http.post(`${config["base_url"]}/api/panel/accounts/store`, JSON.stringify(acc))
}

export const EditAcc = async acc => {
    return await http.post(`${config["base_url"]}/api/panel/accounts/${acc.id}/update`, JSON.stringify(acc))
}

export const DeleteAcc = async (acc_id) => {
    return await http.get(`${config["base_url"]}/api/panel/accounts/${acc_id}/destroy`)
}

export const ShowAcc = async acc_id => {
    return await http.get(`${config["base_url"]}/api/panel/accounts/${acc_id}/show`)
}

export const updateSlAndTpStats = async acc_id => {
    return await http.get(`${config["base_url"]}/api/panel/accounts/${acc_id}/update-stop-loss-and-take-profit`)
}
