import { ShowAcc } from "../../Services/AccSevices"


export const setAccount = account => {
    return async dispatch => {
        await dispatch({ type: "SET_ACCOUNT", payload: account })
    }
}


export const reloadAccount = acc_id => {
    return async dispatch => {
        const {data} = await ShowAcc(acc_id)
        await dispatch({ type: "SET_ACCOUNT", payload: data.account })
    }
}
