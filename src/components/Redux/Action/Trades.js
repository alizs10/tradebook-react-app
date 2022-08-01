import { getTrades } from "../../Services/DataLoader";

export const getAllTrades = (account_id) => {
    return async dispatch => {
        const {data} = await getTrades(account_id);
        await dispatch({type: "INIT_TRADES", payload: data.trades})
    }
}

export const DeleteTrade = (trade_id) => {
    return async (dispatch, getState) => {
        const tradesInstance = getState().Trades;
        const filteredTrades = tradesInstance.filter(ele => ele.id !== trade_id)

        await dispatch({ type: "DELETE_TRADE", payload: filteredTrades })
    }
}