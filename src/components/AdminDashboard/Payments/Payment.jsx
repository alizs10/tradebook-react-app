import React, {useState } from 'react';
import Dropdown from './Dropdown';

const Payment = ({ payment, iteration, setPayment, handleDelPayment, setDoUserNeedEditPaymentWindow, setDoUserNeedDetailsPaymentWindow }) => {

    const [showDropDownBtn, setShowDropDownBtn] = useState(false);
    const toggleDropDownBtn = () => setShowDropDownBtn(!showDropDownBtn);

    const handleOpenEditPaymentWindow = () => {
        setPayment(payment)
        setDoUserNeedEditPaymentWindow(true)
        toggleDropDownBtn()
    }

    const handleOpenPaymentDetailsWindow = () => {
        setPayment(payment)
        setDoUserNeedDetailsPaymentWindow(true)
        toggleDropDownBtn()
    }

    return (

        <tr className="text-xxs lg:text-base font-light mt-2 py-2 dark:text-slate-300">
            <td className="py-4 pr-1">{iteration}</td>
            <td className="py-4">{payment.user_name}</td>
            <td className="py-4">{payment.plan_name}</td>
            <td className="py-4 hidden sm:block">{payment.amount}</td>
            <td className="py-4">
                <span className={`px-2 py-1 rounded-lg text-slate-900 ${payment.status == 1 ? "bg-emerald-400" : "bg-red-400"}`}>
                    {payment.status == 1 ? "موفق" : "ناموفق"}
                </span>
            </td>
            <td className="relative">
                <button onClick={toggleDropDownBtn}
                    className="py-1 px-2 text-xxs lg:text-base lg:px-4 lg:py-2 rounded-lg bg-slate-200 dark:bg-slate-900"
                >
                    <span>عملیات</span>
                    <i className="fa-light fa-angle-down mr-1"></i>
                </button>
                {showDropDownBtn && (
                    <Dropdown toggleDropDownBtn={toggleDropDownBtn} payment_id={payment.id} handleDelPayment={handleDelPayment} handleOpenPaymentDetailsWindow={handleOpenPaymentDetailsWindow} />
                )}

            </td>
        </tr>
    );
}

export default Payment;