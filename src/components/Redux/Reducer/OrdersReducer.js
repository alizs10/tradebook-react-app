export const UserOrdersReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_USER_ORDERS':
            return [...action.payload];
            break;
        case 'ADD_USER_ORDER':
            return [...action.payload];
            break;
        case 'UPDATE_USER_ORDER':
            return [...action.payload];
            break;

        default:
            return state;
            break;
    }
}