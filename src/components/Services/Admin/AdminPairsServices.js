import http from "../http";
import config from "../config.json";


export const getAdminPairs = async () => {
    return await http.get(`${config['base_url']}/api/admin/pairs`)
}

export const CreateAdminPair = async (adminPair) => {
    return await http.post(`${config['base_url']}/api/admin/pairs/store`, JSON.stringify(adminPair))
}

export const UpdateAdminPair = async (adminPair) => {
    return await http.post(`${config['base_url']}/api/admin/pairs/${adminPair.id}/update`, JSON.stringify(adminPair))
}

export const DestroyAdminPair = (adminPair_id) => {
    return http.get(`${config['base_url']}/api/admin/pairs/${adminPair_id}/destroy`)
}