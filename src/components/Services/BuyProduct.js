import http from "./http";
import config from "./config.json";

export const showOrder = async (order_id) => {
    return await http.get(`${config['base_url']}/api/panel/orders/${order_id}/show`)
}

export const storeOrder = async (plan_id) => {
    return await http.post(`${config['base_url']}/api/panel/orders/${plan_id}/store`)
}

export const checkAndApplyDiscountCode = async (order_id, discount) => {
    return await http.post(`${config['base_url']}/api/panel/orders/${order_id}/check-and-apply-discount-code`, JSON.stringify(discount))
}

export const cancelOrder = async (order_id) => {
    return await http.get(`${config['base_url']}/api/panel/orders/${order_id}/cancel`)
}