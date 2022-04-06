import { getOrders } from "../../../Services/Admin/OrdersServices";

export const getAllOrders = () => {
    return async dispatch => {
        const { data } = await getOrders();
        await dispatch({ type: "INIT_ORDERS", payload: data.orders })
    }
}

export const AddOrder = (order) => {
    return async (dispatch, getState) => {
        const orders = getState().Orders;
        const ordersInstance = [...orders, order];
        await dispatch({ type: "ADD_ORDER", payload: ordersInstance })
    }
}

export const EditOrder = (edited_order) => {
    return async (dispatch, getState) => {
        const ordersInstance = getState().Orders;
        let filteredOrders = ordersInstance.filter(order => order.id !== edited_order.id)
        filteredOrders = [...filteredOrders, edited_order]

        await dispatch({ type: "UPDATE_ORDER", payload: filteredOrders })
    }
}

export const DeleteOrder = (order_id) => {
    return async (dispatch, getState) => {
        const ordersInstance = getState().Orders;
        const filteredOrders = ordersInstance.filter(ele => ele.id !== order_id)

        await dispatch({ type: "DELETE_ORDER", payload: filteredOrders })
    }
}