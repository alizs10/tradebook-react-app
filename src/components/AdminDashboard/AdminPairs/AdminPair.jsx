import React, { useState } from 'react';
import Dropdown from '../Users/Dropdown';

const AdminPair = ({ adminPair, iteration, setAdminPair, handleDelAdminPair, setDoUserNeedEditAdminPairWindow, setDoUserNeedDetailsAdminPairWindow }) => {

    const [showDropDownBtn, setShowDropDownBtn] = useState(false);
    const toggleDropDownBtn = () => setShowDropDownBtn(!showDropDownBtn);


    const handleOpenEditAdminPairWindow = () => {
        setAdminPair(adminPair)
        setDoUserNeedEditAdminPairWindow(true)
        toggleDropDownBtn()
    }

    const handleOpenAdminPairDetailsWindow = () => {
        setAdminPair(adminPair)
        setDoUserNeedDetailsAdminPairWindow(true)
        toggleDropDownBtn()
    }

    return (

        <tr className="text-xxs lg:text-base font-light mt-2 py-2 text-slate-300">
            <td className="py-4 pr-1">{iteration}</td>
            <td className="py-4">{adminPair.name}</td>
            <td className="py-4">{adminPair.type === 0 ? "crypto" : "forex"}</td>
            <td className="py-4 hidden sm:block">{adminPair.status === 0 ? "غیرفعال" : "فعال"}</td>
            <td className="relative">
                <button onClick={toggleDropDownBtn}
                    className="py-1 px-2 text-xxs lg:text-base lg:px-4 lg:py-2 rounded-lg bg-slate-900"
                >
                    <span>عملیات</span>
                    <i className="fa-light fa-angle-down mr-1"></i>
                </button>
                {showDropDownBtn && (
                   
                    <Dropdown toggleDropDownBtn={toggleDropDownBtn} pair_id={adminPair.id} handleDelAdminPair={handleDelAdminPair} handleOpenEditAdminPairWindow={handleOpenEditAdminPairWindow} handleOpenAdminPairDetailsWindow={handleOpenAdminPairDetailsWindow} />

                )}

            </td>
        </tr>
    );
}

export default AdminPair;