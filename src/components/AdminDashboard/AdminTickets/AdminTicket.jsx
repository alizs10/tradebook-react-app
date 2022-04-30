import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChangeAdminTicketStatus } from '../../Redux/Action/Admin/AdminTickets';
import { changeTicketStatus } from '../../Services/Admin/AdminTicketsService';
import { notify } from '../../Services/alerts';
import Dropdown from './Dropdown';

const AdminTicket = ({ adminTicket, iteration, setAdminTicket, handleDelAdminTicket }) => {

   
    const [status, setStauts] = useState(adminTicket.status);

    const [showDropDownBtn, setShowDropDownBtn] = useState(false);
    const toggleDropDownBtn = () => setShowDropDownBtn(!showDropDownBtn);

    const dispatch = useDispatch()


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
            <td className="relative">
                <button onClick={toggleDropDownBtn}
                    className="py-1 px-2 text-xxs lg:text-base lg:px-4 lg:py-2 rounded-lg bg-slate-200 dark:bg-slate-900"
                >
                    <span>عملیات</span>
                    <i className="fa-light fa-angle-down mr-1"></i>
                </button>
                {showDropDownBtn && (
                   
                    <Dropdown status={status} toggleDropDownBtn={toggleDropDownBtn} ticket_id={adminTicket.id} handleDelAdminTicket={handleDelAdminTicket} handleChangeTicketStatus={handleChangeTicketStatus} />
                )}

            </td>
        </tr>
    );
}

export default AdminTicket;