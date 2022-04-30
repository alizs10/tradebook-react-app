import React, { useState } from 'react';
import Dropdown from './Dropdown';

const Discount = ({ discount, iteration, setDiscount, handleDelDiscount, setDoUserNeedEditDiscountWindow, setDoUserNeedDetailsDiscountWindow }) => {

    const [showDropDownBtn, setShowDropDownBtn] = useState(false);
    const toggleDropDownBtn = () => setShowDropDownBtn(!showDropDownBtn);

    const handleOpenEditDiscountWindow = () => {
        setDiscount(discount)
        setDoUserNeedEditDiscountWindow(true)
        toggleDropDownBtn()
    }

    const handleOpenDiscountDetailsWindow = () => {
        setDiscount(discount)
        setDoUserNeedDetailsDiscountWindow(true)
        toggleDropDownBtn()
    }

    return (

        <tr className="text-xxs lg:text-base font-light mt-2 py-2 dark:text-slate-300">
            <td className="py-4 pr-1">{iteration}</td>
            <td className="py-4">{discount.code}</td>
            <td className="py-4">{discount.user_name}</td>
            <td className="py-4">{discount.plan_name}</td>
            <td className="py-4 hidden sm:block">{discount.value}</td>
            <td className="py-4">
                {discount.status == 0 ? "استفاده نشده" : "استفاده شده"}
            </td>
            <td className="relative">
                <button onClick={toggleDropDownBtn}
                    className="py-1 px-2 text-xxs lg:text-base lg:px-4 lg:py-2 rounded-lg bg-slate-200 dark:bg-slate-900"
                >
                    <span>عملیات</span>
                    <i className="fa-light fa-angle-down mr-1"></i>
                </button>
                {!showDropDownBtn ? null : (
                    <Dropdown toggleDropDownBtn={toggleDropDownBtn} discount_id={discount.id} handleDelDiscount={handleDelDiscount} handleOpenEditDiscountWindow={handleOpenEditDiscountWindow} handleOpenDiscountDetailsWindow={handleOpenDiscountDetailsWindow} />
                )}

            </td>
        </tr>
    );
}

export default Discount;