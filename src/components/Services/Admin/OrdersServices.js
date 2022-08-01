import http from "../http";
import config from "../config.json";


export const getOrders = async () => {
    return await http.get(`${config['base_url']}/api/admin/orders`)
}

export const CreateOrder = async (order) => {
    return await http.post(`${config['base_url']}/api/admin/orders/store`, JSON.stringify(order))
}

export const UpdateOrder = async (order) => {
    return await http.post(`${config['base_url']}/api/admin/orders/${order.id}/update`, JSON.stringify(order))
}

export const DestroyOrder = (order_id) => {
    return http.get(`${config['base_url']}/api/admin/orders/${order_id}/destroy`)
}