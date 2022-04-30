import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

const Dropdown = ({ handleOpenNotificationDetailsWindow, handleOpenEditNotificationWindow, handleDelNotification, notification_id, toggleDropDownBtn }) => {
    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                toggleDropDownBtn();
            }}
        >
            <ul
                className="absolute top-12 -right-10 lg:top-14 lg:right-auto z-10 drop-shadow-lg bg-slate-100 dark:bg-slate-800 rounded-lg w-24 lg:w-36 overflow-hidden">
                <li>
                    <button onClick={() => handleOpenNotificationDetailsWindow()}
                        className="w-full text-right text-xxxs lg:text-xs py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition ease-out duration-300">
                        <i className="fa-light fa-memo-circle-info text-xs lg:text-base mx-2"></i>
                        جزییات</button>
                </li>
                <li>
                    <button onClick={() => handleOpenEditNotificationWindow()}
                        className="w-full text-right text-xxxs lg:text-xs py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition ease-out duration-300">
                        <i className="fa-light fa-pen-to-square text-xs lg:text-base mx-2"></i>
                        ویرایش</button>
                </li>
                <li>
                    <button onClick={() => handleDelNotification(notification_id)}
                        className="w-full text-right text-xxxs lg:text-xs py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition ease-out duration-300">
                        <i className="fa-light fa-trash text-xs lg:text-base mx-2"></i>
                        حذف</button>
                </li>

            </ul>
        </OutsideClickHandler>

    );
}

export default Dropdown;