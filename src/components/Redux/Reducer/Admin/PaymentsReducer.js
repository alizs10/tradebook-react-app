export const PaymentsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_PAYMENTS':
            return [...action.payload];
            break;
        case 'ADD_PAYMENT':
            return [...action.payload];
            break;
        case 'UPDATE_PAYMENT':
            return [...action.payload];
            break;
        case 'DELETE_PAYMENT':
            return [...action.payload];
            break;

        default:
            return state;
            break;
    }
}