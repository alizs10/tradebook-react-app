export const AdminHomeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADMIN_HOME_DATA_INIT':
            return { ...action.payload };
            break;
        default:
            return state;
            break;
    }
}