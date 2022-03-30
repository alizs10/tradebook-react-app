import { getCryptoPairs, getForexPairs } from "../../Services/DataLoader";


export const setCryptoPairs = () => {
    return async (dispatch, getState) => {
        const {data} = await getCryptoPairs();
        const paireInstance = getState().Pairs;
        await dispatch({type: "CRYPTO_PAIRS_INIT", payload: {...paireInstance, crypto: data.pairs}})
    }
}

export const setForexPairs = () => {
    return async (dispatch, getState) => {
        const {data} = await getForexPairs();
        const paireInstance = getState().Pairs;
        await dispatch({type: "FOREX_PAIRS_INIT", payload: {...paireInstance, forex: data.pairs}})
    }
}