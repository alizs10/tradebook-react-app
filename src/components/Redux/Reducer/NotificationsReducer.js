export const NotificationsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_NOTIFICATIONS':
            return [...action.payload];
            break;
        case 'SEEN_NOTIFICATION':
            return [...action.payload];
            break;
        default:
            return state;
            break;
    }
}