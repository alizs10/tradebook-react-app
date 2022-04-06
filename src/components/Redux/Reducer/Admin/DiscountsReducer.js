export const DiscountsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_DISCOUNTS':
            return [...action.payload];
            break;
        case 'ADD_DISCOUNT':
            return [...action.payload];
            break;
        case 'UPDATE_DISCOUNT':
            return [...action.payload];
            break;
        case 'DELETE_DISCOUNT':
            return [...action.payload];
            break;

        default:
            return state;
            break;
    }
}