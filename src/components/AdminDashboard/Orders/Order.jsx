import React, { useState } from 'react';
import Dropdown from './Dropdown';

const Order = ({ order, iteration, setOrder, handleDelOrder, setDoUserNeedEditOrderWindow, setDoUserNeedDetailsOrderWindow }) => {

    const [showDropDownBtn, setShowDropDownBtn] = useState(false);
    const toggleDropDownBtn = () => setShowDropDownBtn(!showDropDownBtn);

    const handleOpenEditOrderWindow = () => {
        setOrder(order)
        setDoUserNeedEditOrderWindow(true)
        toggleDropDownBtn()
    }

    const handleOpenOrderDetailsWindow = () => {
        setOrder(order)
        setDoUserNeedDetailsOrderWindow(true)
        toggleDropDownBtn()
    }

    return (

        <tr className="text-xxs lg:text-base font-light mt-2 py-2 text-slate-300">
            <td className="py-4 pr-1">{iteration}</td>
            <td className="py-4">{order.user_name}</td>
            <td className="py-4">{order.plan_name}</td>
            <td className="py-4 hidden sm:block">{order.total_amount}</td>
            <td className="py-4">
                {order.status_name}
            </td>
            <td className="relative">
                <button onClick={toggleDropDownBtn}
                    className="py-1 px-2 text-xxs lg:text-base lg:px-4 lg:py-2 rounded-lg bg-slate-900"
                >
                    <span>عملیات</span>
                    <i className="fa-light fa-angle-down mr-1"></i>
                </button>
                {showDropDownBtn && (
                    <Dropdown toggleDropDownBtn={toggleDropDownBtn} order_id={order.id} handleDelOrder={handleDelOrder} handleOpenOrderDetailsWindow={handleOpenOrderDetailsWindow} />
                )}

            </td>
        </tr>
    );
}

export default Order;