export const HomeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'HOME_DATA_INIT':
            return { ...action.payload };
            break;
        default:
            return state;
            break;
    }
}