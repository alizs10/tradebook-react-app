import React, { useEffect, useRef, useState } from 'react';
import Dropdown from './Dropdown';

const Notification = ({ notification, iteration, setNotification, handleDelNotification, setDoUserNeedEditNotificationWindow, setDoUserNeedDetailsNotificationWindow }) => {


    const [showDropDownBtn, setShowDropDownBtn] = useState(false);
    const toggleDropDownBtn = () => setShowDropDownBtn(!showDropDownBtn);


    const handleOpenEditNotificationWindow = () => {
        setNotification(notification)
        setDoUserNeedEditNotificationWindow(true)
        toggleDropDownBtn()
    }

    const handleOpenNotificationDetailsWindow = () => {
        setNotification(notification)
        setDoUserNeedDetailsNotificationWindow(true)
        toggleDropDownBtn()
    }

    return (

        <tr className="text-xxs lg:text-base font-light mt-2 py-2 dark:text-slate-300">
            <td className="py-4 pr-1">{iteration}</td>
            <td className="py-4">{notification.user_name}</td>
            <td className="py-4">{`${notification.message.slice(0, 50)} ${notification.message.length > 50 ? "..." : ""}`}</td>
            <td className="py-4">{notification.seen == 0 ? "فعال" : "غیرفعال"}</td>
            <td className="relative">
                <button onClick={toggleDropDownBtn}
                    className="py-1 px-2 text-xxs lg:text-base lg:px-4 lg:py-2 rounded-lg bg-slate-200 dark:bg-slate-900"
                >
                    <span>عملیات</span>
                    <i className="fa-light fa-angle-down mr-1"></i>
                </button>
                {showDropDownBtn && (
                    <Dropdown toggleDropDownBtn={toggleDropDownBtn} notification_id={notification.id} handleDelNotification={handleDelNotification} handleOpenEditNotificationWindow={handleOpenEditNotificationWindow} handleOpenNotificationDetailsWindow={handleOpenNotificationDetailsWindow} />

                )}

            </td>
        </tr>
    );
}

export default Notification;