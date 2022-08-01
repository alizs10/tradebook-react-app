export const OrdersReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ORDERS':
            return [...action.payload];
            break;
        case 'ADD_ORDER':
            return [...action.payload];
            break;
        case 'UPDATE_ORDER':
            return [...action.payload];
            break;
        case 'DELETE_ORDER':
            return [...action.payload];
            break;

        default:
            return state;
            break;
    }
}