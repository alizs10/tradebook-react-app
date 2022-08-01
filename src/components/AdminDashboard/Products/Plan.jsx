import React, { useState } from 'react';
import Dropdown from './Dropdown';

const Plan = ({ plan, iteration, setPlan, handleDelPlan, setDoUserNeedEditPlanWindow, setDoUserNeedDetailsPlanWindow }) => {

    const [showDropDownBtn, setShowDropDownBtn] = useState(false);
    const toggleDropDownBtn = () => setShowDropDownBtn(!showDropDownBtn);

    const handleOpenEditPlanWindow = () => {
        setPlan(plan)
        setDoUserNeedEditPlanWindow(true)
        toggleDropDownBtn()
    }

    const handleOpenPlanDetailsWindow = () => {
        setPlan(plan)
        setDoUserNeedDetailsPlanWindow(true)
        toggleDropDownBtn()
    }

    return (

        <tr className="text-xxs lg:text-base font-light mt-2 py-2 text-slate-300">
            <td className="py-4 pr-1">{iteration}</td>
            <td className="py-4">{plan.name}</td>
            <td className="py-4">{plan.valid_for + " روز"}</td>
            <td className="py-4 hidden sm:block">{plan.price + " تومان"}</td>
            <td className="relative">
                <button onClick={toggleDropDownBtn}
                    className="py-1 px-2 text-xxs lg:text-base lg:px-4 lg:py-2 rounded-lg bg-slate-900"
                >
                    <span>عملیات</span>
                    <i className="fa-light fa-angle-down mr-1"></i>
                </button>
                {showDropDownBtn && (
                    <Dropdown toggleDropDownBtn={toggleDropDownBtn} plan_id={plan.id} handleDelPlan={handleDelPlan} handleOpenEditPlanWindow={handleOpenEditPlanWindow} handleOpenPlanDetailsWindow={handleOpenPlanDetailsWindow} />
                )}

            </td>
        </tr>
    );
}

export default Plan;