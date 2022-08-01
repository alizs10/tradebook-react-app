import http from "../http";
import config from "../config.json";


export const getPayments = async () => {
    return await http.get(`${config['base_url']}/api/admin/payments`)
}

export const CreatePayment = async (payment) => {
    return await http.post(`${config['base_url']}/api/admin/payments/store`, JSON.stringify(payment))
}

export const UpdatePayment = async (payment) => {
    return await http.post(`${config['base_url']}/api/admin/payments/${payment.id}/update`, JSON.stringify(payment))
}

export const DestroyPayment = (payment_id) => {
    return http.get(`${config['base_url']}/api/admin/payments/${payment_id}/destroy`)
}