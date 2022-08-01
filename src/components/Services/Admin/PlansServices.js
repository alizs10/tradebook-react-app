import http from "../http";
import config from "../config.json";


export const getPlans = async () => {
    return await http.get(`${config['base_url']}/api/admin/plans`)
}

export const CreatePlan = async (plan) => {
    return await http.post(`${config['base_url']}/api/admin/plans/store`, JSON.stringify(plan))
}

export const UpdatePlan = async (plan) => {
    return await http.post(`${config['base_url']}/api/admin/plans/${plan.id}/update`, JSON.stringify(plan))
}

export const DestroyPlan = (plan_id) => {
    return http.get(`${config['base_url']}/api/admin/plans/${plan_id}/destroy`)
}