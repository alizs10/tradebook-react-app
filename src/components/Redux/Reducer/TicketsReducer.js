export const TicketsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_TICKETS':
            return [...action.payload];
            break;
        case 'ADD_TICKET':
            return [...action.payload];
            break;
        default:
            return state;
            break;
    }
}