export const AdminTicketsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ADMIN_TICKETS':
            return [...action.payload];
            break;
        case 'CHANGE_ADMIN_TICKET_STATUS':
            return [...action.payload];
            break;
        case 'DELETE_ADMIN_TICKET':
            return [...action.payload];
            break;
        default:
            return state;
            break;
    }
}