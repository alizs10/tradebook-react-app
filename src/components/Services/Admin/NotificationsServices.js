import http from "../http";
import config from "../config.json";


export const getAdminNotifications = async () => {
    return await http.get(`${config['base_url']}/api/admin/notifications`)
}

export const SendNotification = async (notification) => {
    return await http.post(`${config['base_url']}/api/admin/notifications/send`, JSON.stringify(notification))
}

export const UpdateNotification = async (notification) => {
    return await http.post(`${config['base_url']}/api/admin/notifications/${notification.id}/update`, JSON.stringify(notification))
}

export const DestroyNotification = (notification_id) => {
    return http.get(`${config['base_url']}/api/admin/notifications/${notification_id}/destroy`)
}