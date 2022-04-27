import React from 'react';

const UserPlanValue = ({ val, iteration }) => {

    return (

        <tr className="text-xxs lg:text-base font-light mt-2 py-2 dark:text-slate-300">
            <td className="py-4 pr-1">{iteration}</td>
            <td className="py-4">{val.user_name}</td>
            <td className="py-4">{val.user_email}</td>
            <td className="py-4">{val.valid_for}</td>
            <td className="py-4">{val.valid_until}</td>
        </tr>
    );
}

export default UserPlanValue;