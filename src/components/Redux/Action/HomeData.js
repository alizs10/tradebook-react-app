import { getHomeData } from "../../Services/DataLoader";


export const setHomeData = () => {
    return async dispatch => {
        const { data } = await getHomeData();
        await dispatch({ type: "HOME_DATA_INIT", payload: { data } })
    }
}
