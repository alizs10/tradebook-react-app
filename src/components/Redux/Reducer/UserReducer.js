export const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return { ...action.payload };
            break;
        case 'CLEAR_USER':
            return { ...action.payload };
            break;

        default:
            return state;
            break;
    }
}