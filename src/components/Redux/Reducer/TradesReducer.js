export const TradesReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_TRADES':
            return [...action.payload];
            break;
        case 'DELETE_TRADE':
            return [...action.payload];
            break;

        default:
            return state;
            break;
    }
}