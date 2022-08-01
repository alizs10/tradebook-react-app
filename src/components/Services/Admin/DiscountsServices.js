import http from "../http";
import config from "../config.json";


export const getDiscounts = async () => {
    return await http.get(`${config['base_url']}/api/admin/discounts`)
}

export const CreateDiscount = async (discount) => {
    return await http.post(`${config['base_url']}/api/admin/discounts/store`, JSON.stringify(discount))
}

export const UpdateDiscount = async (discount) => {
    return await http.post(`${config['base_url']}/api/admin/discounts/${discount.id}/update`, JSON.stringify(discount))
}

export const DestroyDiscount = (discount_id) => {
    return http.get(`${config['base_url']}/api/admin/discounts/${discount_id}/destroy`)
}