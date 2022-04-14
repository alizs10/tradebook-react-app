import { getTickets } from "../../Services/TicketsService";


export const getAllTickets = () => {
    return async dispatch => {
        const { data } = await getTickets();
        await dispatch({ type: "INIT_TICKETS", payload: data.tickets })
    }
}

export const createTicket = (ticket) => {
    return async (dispatch, getState) => {
        const tickets = getState().Tickets;
        const ticketsInstance = [...tickets, ticket]

        await dispatch({ type: "ADD_TICKET", payload: ticketsInstance })
    }
}

