import http from "../http";
import config from "../config.json";


export const getUsers = async () => {
    return await http.get(`${config['base_url']}/api/admin/users`)
}

export const UpdateUser = async (user) => {
    return await http.post(`${config['base_url']}/api/admin/users/${user.id}/update`, JSON.stringify(user))
}

export const DestroyUser = (user_id) => {
    return http.get(`${config['base_url']}/api/admin/users/${user_id}/destroy`)
}