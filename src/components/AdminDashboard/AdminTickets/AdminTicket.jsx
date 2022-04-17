import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ChangeAdminTicketStatus } from '../../Redux/Action/Admin/AdminTickets';
import { changeTicketStatus } from '../../Services/Admin/AdminTicketsService';
import { notify } from '../../Services/alerts';
import listenForOutsideClicks from '../../Services/listenForOutsideClick';

const AdminTicket = ({ adminTicket, iteration, setAdminTicket, handleDelAdminTicket }) => {

    const dropdownBtnRef = useRef(null);
    const [listening, setListening] = useState(false);
    const [status, setStauts] = useState(adminTicket.status);

    const [showDropDownBtn, setShowDropDownBtn] = useState(false);
    const toggleDropDownBtn = () => setShowDropDownBtn(!showDropDownBtn);

    const dispatch = useDispatch()

    useEffect(listenForOutsideClicks(listening, setListening, dropdownBtnRef, setShowDropDownBtn, setAdminTicket));

    let type = "";

    switch (`${adminTicket.type}`) {
        case "0":
            type = "گزارش مشکل";
            break;
        case "1":
            type = "پیشنهاد";
            break;
        case "2":
            type = "انتقاد";
            break;
        case "3":
            type = "پرسش";
            break;
        case "4":
            type = "دیگر موارد";
            break;

        default:
            break;
    }

    

    const handleChangeTicketStatus = async () => {

        try {
            const { status, data } = await changeTicketStatus(adminTicket.id)

            if (status == 200) {
                setStauts(data.status)
                dispatch(ChangeAdminTicketStatus(adminTicket.id,data.status))
                if (data.status == 1) {
                    notify("تیکت با موفقیت بسته شد", "success")
                } else {
                    notify("تیکت با موفقیت باز شد", "success")
                }

            }
        } catch (error) {
            notify("مشکلی پیش آمده است", "error")
        }


    }

    return (

        <tr className="text-xxs lg:text-base font-light mt-2 py-2 dark:text-slate-300">
            <td className="py-4 pr-1">{iteration}</td>
            <td className="py-4">{adminTicket.user_email}</td>
            <td className="py-4">{type}</td>
            <td className="py-4">{status == 0 ? "باز" : "بسته"}</td>
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
                            <NavLink to={`${adminTicket.id}/show`}
                                className="w-full block text-right text-xxxs lg:text-xs py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition ease-out duration-300">
                                <i className="fa-light fa-pen-to-square text-xs lg:text-base mx-2"></i>
                                مشاهده</NavLink>
                        </li>
                        <li>
                            <button
                                className="w-full text-right text-xxxs lg:text-xs py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition ease-out duration-300" onClick={() => handleChangeTicketStatus()}>
                                <i className="fa-light fa-pen-to-square text-xs lg:text-base mx-2"></i>
                                {status == 0 ? "بستن تیکت" : "باز کردن تیکت"}</button>
                        </li>
                        <li>
                            <button onClick={() => handleDelAdminTicket(adminTicket.id)}
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

export default AdminTicket;