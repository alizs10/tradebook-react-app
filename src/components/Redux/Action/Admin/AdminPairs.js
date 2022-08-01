import { getAdminPairs } from "../../../Services/Admin/AdminPairsServices";

export const getAllAdminPairs = () => {
    return async dispatch => {
        const { data } = await getAdminPairs();
        await dispatch({ type: "INIT_ADMIN_PAIRS", payload: data.pairs })
    }
}

export const AddAdminPair = (adminPair) => {
    return async (dispatch, getState) => {
        const adminPairs = getState().AdminPairs;
        console.log(adminPair);
        const adminPairsInstance = [...adminPairs, adminPair];
        await dispatch({ type: "ADD_ADMIN_PAIR", payload: adminPairsInstance })
    }
}

export const EditAdminPair = (edited_adminPair) => {
    return async (dispatch, getState) => {
        const adminPairsInstance = getState().AdminPairs;
        let filteredPayments = adminPairsInstance.filter(adminPair => adminPair.id !== edited_adminPair.id)
        filteredPayments = [...filteredPayments, edited_adminPair]

        await dispatch({ type: "UPDATE_ADMIN_PAIR", payload: filteredPayments })
    }
}

export const DeleteAdminPair = (adminPair_id) => {
    return async (dispatch, getState) => {
        const adminPairsInstance = getState().AdminPairs;
        const filteredAdminPairs = adminPairsInstance.filter(ele => ele.id !== adminPair_id)

        await dispatch({ type: "DELETE_ADMIN_PAIR", payload: filteredAdminPairs })
    }
}