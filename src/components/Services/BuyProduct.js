import http from "./http";
import config from "./config.json";



export const getUserOrders = async () => {
    return await http.get(`${config['base_url']}/api/panel/orders`)
}

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

export const storePayment = async (order_id) => {
    return await http.get(`${config['base_url']}/api/panel/payments/${order_id}/store`)
}

export const updatePayment = async (payment) => {
    return await http.get(`${config['base_url']}/api/panel/payments/verify-payment?Authority=${payment.Authority}&Status=${payment.Status}`)
}