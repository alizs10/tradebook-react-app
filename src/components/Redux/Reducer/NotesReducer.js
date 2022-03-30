export const NotesReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_NOTES':
            return [...action.payload];
            break;
        case 'ADD_NOTE':
            return [...action.payload];
            break;
        case 'UPDATE_NOTE':
            return [...action.payload];
            break;
        case 'DELETE_NOTE':
            return [...action.payload];
            break;

        default:
            return state;
            break;
    }
}