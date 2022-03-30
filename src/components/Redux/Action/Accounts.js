import { getAccounts } from "../../Services/DataLoader";

export const getAllAccounts = () => {
    return async dispatch => {
        const {data} = await getAccounts();
        await dispatch({type: "INIT", payload: data.accounts})
    }
}