import React, { useEffect, useRef, useState } from 'react';
import listenForOutsideClicks from '../../Services/listenForOutsideClick';
import Dropdown from './Dropdown';

const User = ({ user, iteration, setUser, handleDelUser, setDoUserNeedEditUserWindow, setDoUserNeedDetailsUserWindow }) => {

    const [showDropDownBtn, setShowDropDownBtn] = useState(false);
    const toggleDropDownBtn = () => setShowDropDownBtn(!showDropDownBtn);


    const handleOpenEditUserWindow = () => {
        setUser(user)
        setDoUserNeedEditUserWindow(true)
        toggleDropDownBtn()
    }

    const handleOpenUserDetailsWindow = () => {
        setUser(user)
        setDoUserNeedDetailsUserWindow(true)
        toggleDropDownBtn()
    }

    return (

        <tr className="text-xxs lg:text-base font-light mt-2 py-2 dark:text-slate-300">
            <td className="py-4 pr-1">{iteration}</td>
            <td className="py-4">{user.name}</td>
            <td className="py-4">{user.email}</td>
            <td className="py-4 hidden sm:block">{user.mobile}</td>
            <td className="py-4">
                {parseInt(user.is_admin) === 0 ? "کاربر عادی" : "ادمین"}
            </td>
            <td className="relative">
                <button onClick={() => toggleDropDownBtn()}
                    className="py-1 px-2 text-xxs lg:text-base lg:px-4 lg:py-2 rounded-lg bg-slate-200 dark:bg-slate-900"
                >
                    <span>عملیات</span>
                    <i className="fa-light fa-angle-down mr-1"></i>
                </button>
                {showDropDownBtn && (
                    <Dropdown toggleDropDownBtn={toggleDropDownBtn} user_id={user.id} handleDelUser={handleDelUser} handleOpenEditUserWindow={handleOpenEditUserWindow} handleOpenUserDetailsWindow={handleOpenUserDetailsWindow} />
                )}

            </td>
        </tr>
    );
}

export default User;