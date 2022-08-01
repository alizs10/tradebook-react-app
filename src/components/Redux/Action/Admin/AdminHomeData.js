import { getAdminHomeData } from "../../../Services/Admin/DataLoader";

export const setAdminHomeData = () => {
    return async dispatch => {
        const { data } = await getAdminHomeData();
        await dispatch({ type: "ADMIN_HOME_DATA_INIT", payload: { data } })
    }
}
