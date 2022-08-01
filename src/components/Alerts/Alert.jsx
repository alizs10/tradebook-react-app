import { isNull } from 'lodash';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateNotification } from '../Redux/Action/Notifications';
import { seenNotification } from '../Services/NotificationsService';

const Alert = ({ message, type, notification_id, user_id }) => {

    let colorClassName = "bg-yellow-500";

    switch (type) {
        case "success":
            colorClassName = "bg-green-500"
            break;
        case "warning":
            colorClassName = "bg-yellow-500"
            break;
        case "error":
            colorClassName = "bg-red-600"
            break;

        default:
            colorClassName = "bg-red-500"
            break;
    }

    const dispatch = useDispatch()

    const handleNotificationSeen = async (id) => {

        try {
            const { data, status } = await seenNotification(id)

            if (status == 200) {
                dispatch(updateNotification(id))
            }
        } catch (error) {

        }

    }

    return (
        <div className={`${colorClassName} rounded-lg drop-shadow-lg p-2 flex flex-col gap-y-2`}>
            <p className="font-semibold text-black text-base">{message}</p>
            {!isNull(user_id) && (
                <button className='text-blue-500 text-sm flex w-fit' onClick={() => handleNotificationSeen(notification_id)}
                >متوجه شدم!</button>
            )}
        </div>
    );
}

export default Alert;