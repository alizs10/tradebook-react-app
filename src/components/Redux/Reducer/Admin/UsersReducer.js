export const UsersReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_USERS':
            return [...action.payload];
            break;
        case 'UPDATE_USER':
            return [...action.payload];
            break;
        case 'DELETE_USER':
            return [...action.payload];
            break;

        default:
            return state;
            break;
    }
}