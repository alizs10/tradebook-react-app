import { getPayments } from "../../../Services/Admin/PaymentsServices";

export const getAllPayments = () => {
    return async dispatch => {
        const { data } = await getPayments();
        await dispatch({ type: "INIT_PAYMENTS", payload: data.payments })
    }
}

export const AddPayment = (payment) => {
    return async (dispatch, getState) => {
        const payments = getState().Payments;
        const paymentsInstance = [...payments, payment];
        await dispatch({ type: "ADD_PAYMENT", payload: paymentsInstance })
    }
}

export const EditPayment = (edited_payment) => {
    return async (dispatch, getState) => {
        const paymentsInstance = getState().Payments;
        let filteredPayments = paymentsInstance.filter(payment => payment.id !== edited_payment.id)
        filteredPayments = [...filteredPayments, edited_payment]

        await dispatch({ type: "UPDATE_PAYMENT", payload: filteredPayments })
    }
}

export const DeletePayment = (payment_id) => {
    return async (dispatch, getState) => {
        const paymentsInstance = getState().Payments;
        const filteredPayments = paymentsInstance.filter(ele => ele.id !== payment_id)

        await dispatch({ type: "DELETE_PAYMENT", payload: filteredPayments })
    }
}