export const PlansReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_PLANS':
            return [...action.payload];
            break;
        case 'ADD_PLAN':
            return [...action.payload];
            break;
        case 'UPDATE_PLAN':
            return [...action.payload];
            break;
        case 'DELETE_PLAN':
            return [...action.payload];
            break;

        default:
            return state;
            break;
    }
}