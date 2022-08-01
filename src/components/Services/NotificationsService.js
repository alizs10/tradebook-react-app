import http from "./http";
import config from "./config.json";


export const getNotifications = async () => {
    return await http.get(`${config['base_url']}/api/panel/notifications`)
}

export const seenNotification = async (notification_id) => {
    return await http.get(`${config['base_url']}/api/panel/notifications/${notification_id}/seen`)
}