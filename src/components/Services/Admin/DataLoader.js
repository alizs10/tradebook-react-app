import http from "../http";
import config from "../config.json";

export const getAdminHomeData = () => {
    return http.get(`${config['base_url']}/api/admin/home`);
}
