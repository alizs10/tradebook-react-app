export const StatisticsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_STATISTICS':
            return [...action.payload];
            break;

        default:
            return state;
            break;
    }
}