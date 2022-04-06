export const AdminPairsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ADMIN_PAIRS':
            return [...action.payload];
            break;
        case 'ADD_ADMIN_PAIR':
            return [...action.payload];
            break;
        case 'UPDATE_ADMIN_PAIR':
            return [...action.payload];
            break;
        case 'DELETE_ADMIN_PAIR':
            return [...action.payload];
            break;

        default:
            return state;
            break;
    }
}