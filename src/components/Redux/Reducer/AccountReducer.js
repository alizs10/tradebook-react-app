export const AccountReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ACCOUNT':
            return { ...action.payload };
            break;

        default:
            return state;
            break;
    }
}