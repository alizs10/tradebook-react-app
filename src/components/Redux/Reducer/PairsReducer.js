export const PairsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CRYPTO_PAIRS_INIT':
            return { ...action.payload };
            break;
        case 'FOREX_PAIRS_INIT':
            return { ...action.payload };
            break;

        default:
            return state;
            break;
    }
}