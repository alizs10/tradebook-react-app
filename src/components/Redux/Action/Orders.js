import { getUserOrders } from "../../Services/BuyProduct";

export const getAllUserOrders = () => {
    return async dispatch => {
        const { data } = await getUserOrders();
        await dispatch({ type: "INIT_USER_ORDERS", payload: data.orders })
    }
}

export const AddUserOrder = (order) => {
    return async (dispatch, getState) => {
        const orders = getState().UserOrders;
        const ordersInstance = [...orders, order];
        await dispatch({ type: "ADD_USER_ORDER", payload: ordersInstance })
    }
}

export const EditUserOrder = (edited_order) => {
    return async (dispatch, getState) => {
        const ordersInstance = getState().UserOrders;
        const orderIndex = ordersInstance.findIndex(order => order.id === edited_order.id)
        const order = ordersInstance[orderIndex];
        order.order = edited_order.order;

        await dispatch({ type: "UPDATE_USER_ORDER", payload: ordersInstance })
    }
}
