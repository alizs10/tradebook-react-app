import { getAdminTickets } from "../../../Services/Admin/AdminTicketsService";

export const getAllAdminTickets = () => {
    return async dispatch => {
        const { data } = await getAdminTickets();
        await dispatch({ type: "INIT_ADMIN_TICKETS", payload: data.tickets })
    }
}

export const ChangeAdminTicketStatus = (ticket_id, status) => {
    return async (dispatch, getState) => {
        const adminTicketsInstance = getState().AdminTickets;
        const index = adminTicketsInstance.findIndex(ele => ele.id === ticket_id)
        let ticket = adminTicketsInstance[index];
        ticket.status = status;
        await dispatch({ type: "CHANGE_ADMIN_TICKET_STATUS", payload: adminTicketsInstance })
    }
}

export const DeleteAdminTicket = (ticket_id) => {
    return async (dispatch, getState) => {
        const adminTicketsInstance = getState().AdminTickets;
        const filteredAdminTickets = adminTicketsInstance.filter(ele => ele.id !== ticket_id)

        await dispatch({ type: "DELETE_ADMIN_TICKET", payload: filteredAdminTickets })
    }
}