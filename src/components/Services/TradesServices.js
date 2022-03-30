import http from "./http";
import config from "./config.json";


export const CreateTrade = async (trade, acc_id) => {
    return await http.post(`${config['base_url']}/api/panel/accounts/${acc_id}/trades/store`, JSON.stringify(trade))
}

export const EditTrade = async (trade, acc_id) => {
    return await http.put(`${config['base_url']}/api/panel/accounts/${acc_id}/trades/${trade.id}/update`, JSON.stringify(trade))
}

export const DestroyTrade = (acc_id, trade_id) => {
    return http.get(`${config['base_url']}/api/panel/accounts/${acc_id}/trades/${trade_id}/destroy`)
}

export const UpdatePrice = async (priceData, acc_id) => {
    return await http.post(`${config['base_url']}/api/panel/accounts/${acc_id}/trades/update-open-trades-price`, JSON.stringify(priceData))
}