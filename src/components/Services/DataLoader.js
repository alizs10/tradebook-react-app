import http from "./http";
import config from "./config.json";

export const getAccounts = () => {
    return http.get(`${config['base_url']}/api/panel/accounts`);
}

export const getCryptoPairs = () => {
    return http.get(`${config['base_url']}/api/panel/pairs/crypto`);
}

export const getForexPairs = () => {
    return http.get(`${config['base_url']}/api/panel/pairs/forex`);
}

export const getTrades = (account_id) => {
    return http.get(`${config['base_url']}/api/panel/accounts/${account_id}/trades`);
}

export const getNotes = () => {
    return http.get(`${config['base_url']}/api/panel/notes`);
}

export const getHomeData = () => {
    return http.get(`${config['base_url']}/api/panel/home`);
}

