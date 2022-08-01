export const AccountsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT':
            return [...action.payload];
            break;

        default:
            return state;
            break;
    }
}