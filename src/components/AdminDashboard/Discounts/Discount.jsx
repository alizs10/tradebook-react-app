import React, { useEffect, useRef, useState } from 'react';
import listenForOutsideClicks from '../../Services/listenForOutsideClick';

const Discount = ({ discount, iteration, setDiscount, handleDelDiscount, setDoUserNeedEditDiscountWindow, setDoUserNeedDetailsDiscountWindow }) => {

    const dropdownBtnRef = useRef(null);
    const [listening, setListening] = useState(false);

    const [showDropDownBtn, setShowDropDownBtn] = useState(false);
    const toggleDropDownBtn = () => setShowDropDownBtn(!showDropDownBtn);

    useEffect(listenForOutsideClicks(listening, setListening, dropdownBtnRef, setShowDropDownBtn, setDiscount));

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
            <td className="relative" ref={dropdownBtnRef}>
                <button onClick={toggleDropDownBtn}
                    className="py-1 px-2 text-xxs lg:text-base lg:px-4 lg:py-2 rounded-lg bg-slate-200 dark:bg-slate-900"
                >
                    <span>عملیات</span>
                    <i className="fa-light fa-angle-down mr-1"></i>
                </button>
                {!showDropDownBtn ? null : (
                    <ul
                        className="absolute top-12 -right-10 lg:top-14 lg:right-auto z-10 drop-shadow-lg bg-slate-100 dark:bg-slate-800 rounded-lg w-24 lg:w-36 overflow-hidden">
                        <li>
                            <button onClick={() => handleOpenDiscountDetailsWindow()}
                                className="w-full text-right text-xxxs lg:text-xs py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition ease-out duration-300">
                                <i className="fa-light fa-memo-circle-info text-xs lg:text-base mx-2"></i>
                                جزییات</button>
                        </li>
                        <li>
                            <button onClick={() => handleOpenEditDiscountWindow()}
                                className="w-full text-right text-xxxs lg:text-xs py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition ease-out duration-300">
                                <i className="fa-light fa-pen-to-square text-xs lg:text-base mx-2"></i>
                                ویرایش</button>
                        </li>
                        <li>
                            <button onClick={() => handleDelDiscount(discount.id)}
                                className="w-full text-right text-xxxs lg:text-xs py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition ease-out duration-300">
                                <i className="fa-light fa-trash text-xs lg:text-base mx-2"></i>
                                حذف</button>
                        </li>

                    </ul>
                )}

            </td>
        </tr>
    );
}

export default Discount;