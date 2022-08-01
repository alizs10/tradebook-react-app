import { getDiscounts } from "../../../Services/Admin/DiscountsServices";

export const getAllDiscounts = () => {
    return async dispatch => {
        const { data } = await getDiscounts();
        await dispatch({ type: "INIT_DISCOUNTS", payload: data.discounts })
    }
}

export const AddDiscount = (discount) => {
    return async (dispatch, getState) => {
        const discounts = getState().Discounts;
        const discountsInstance = [...discounts, discount];
        await dispatch({ type: "ADD_DISCOUNT", payload: discountsInstance })
    }
}

export const EditDiscount = (edited_discount) => {
    return async (dispatch, getState) => {
        const discountsInstance = getState().Discounts;
        let filteredDiscounts = discountsInstance.filter(discount => discount.id !== edited_discount.id)
        filteredDiscounts = [...filteredDiscounts, edited_discount]

        await dispatch({ type: "UPDATE_DISCOUNT", payload: filteredDiscounts })
    }
}

export const DeleteDiscount = (discount_id) => {
    return async (dispatch, getState) => {
        const discountsInstance = getState().Discounts;
        const filteredDiscounts = discountsInstance.filter(ele => ele.id !== discount_id)

        await dispatch({ type: "DELETE_DISCOUNT", payload: filteredDiscounts })
    }
}