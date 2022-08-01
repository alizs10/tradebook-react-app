import http from "../http";
import config from "../config.json";


export const getAdminTickets = async () => {
    return await http.get(`${config['base_url']}/api/admin/tickets`)
}

export const answerTicket = async (answer, ticket_id) => {
    return await http.post(`${config['base_url']}/api/admin/tickets/${ticket_id}/answer`, JSON.stringify(answer))
}

export const showAdminTicket = async (ticket_id) => {
    return await http.get(`${config['base_url']}/api/admin/tickets/${ticket_id}/show`)
}

export const changeTicketStatus = async (ticket_id) => {
    return await http.get(`${config['base_url']}/api/admin/tickets/${ticket_id}/change-status`)
}

export const destroyAdminTicket = async (ticket_id) => {
    return await http.get(`${config['base_url']}/api/admin/tickets/${ticket_id}/destroy`)
}