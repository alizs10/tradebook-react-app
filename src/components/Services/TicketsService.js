import http from "./http";
import config from "./config.json";


export const getTickets = async () => {
    return await http.get(`${config['base_url']}/api/panel/tickets`)
}

export const storeTicket = async (ticket) => {
    return await http.post(`${config['base_url']}/api/panel/tickets/store`, JSON.stringify(ticket))
}

export const storeAnswerTicket = async (answer, ticket_id) => {
    return await http.post(`${config['base_url']}/api/panel/tickets/${ticket_id}/answer`, JSON.stringify(answer))
}

export const getTicket = async (ticket_id) => {
    return await http.get(`${config['base_url']}/api/panel/tickets/${ticket_id}/show`)
}