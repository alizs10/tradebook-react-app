import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../Services/alerts';
import { UpdateNotification } from '../../Services/Admin/NotificationsServices';
import { notificationValidation } from '../../Services/Admin/adminValidation';
import { getAllUsers } from '../../Redux/Action/Admin/Users';

const EditNotificationWindow = ({ setDoUserNeedEditNotificationWindow, notification, notifications, setNotifications }) => {

    const [message, setMessage] = useState("")
    const [userId, setUserId] = useState("")
    const [section, setSection] = useState("home")
    const [seen, setSeen] = useState("0")
    const [type, setType] = useState("warning")
    const [errors, setErrors] = useState({})

    const users = useSelector(state => state.Users)

    const dispatch = useDispatch()
    useEffect(() => {
        if (isEmpty(users)) {
            dispatch(getAllUsers())
        }

    }, [])

    useEffect(() => {
        if (isEmpty(notification)) return

        setMessage(notification.message)
        setUserId(notification.user_id)
        setSection(notification.section)
        setSeen(notification.seen)
        setType(notification.type)

    }, [notification])

    const handleEditNotification = async () => {

        let editedNotification = {
            id: notification.id, message, user_id: userId, type, section, seen, _method: "PUT"
        }
        const { success, errors } = notificationValidation(editedNotification);

        if (success) {
            setErrors({})
            try {
                const { data, status } = await UpdateNotification(editedNotification);

                if (status == 200) {
                    let notificationsInstance = structuredClone(notifications);
                    notificationsInstance = notificationsInstance.filter(notif => notif.id !== data.notification.id)
                    setNotifications([data.notification, ...notificationsInstance])
                    setDoUserNeedEditNotificationWindow(false)
                    notify('اعلان موردنظر با موفقیت ویرایش شد', 'success')
                }
            }

            catch (error) {
                notify('مشکلی پیش آمده است', 'error')
            }
        } else {
            setErrors(errors)
        }
    }

    return (
        <section className="absolute top-4 z-40 p-2 w-full">

            <div
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900 dark:text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">جزییات اعلان</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedEditNotificationWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="grid grid-cols-2 p-2 gap-2">

                    <div className="col-span-1 flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="userId">کاربر</label>
                        <select className='form-input' id="userId" value={userId} onChange={event => {
                            setUserId(event.target.value);
                        }}>
                            <option value="">عمومی</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{`${user.name} - ${user.email}`}</option>
                            ))}

                        </select>
                        {errors.user_id && (<span className='text-xxs text-red-400'>{errors.user_id}</span>)}

                    </div>


                    <div className="col-span-1 flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="seen">وضعیت</label>
                        <select className='form-input' id="seen" value={seen} onChange={event => {
                            setSeen(event.target.value);
                        }}>
                            <option value="0">فعال</option>
                            <option value="1" >غیرفعال</option>
                        </select>
                        {errors.seen && (<span className='text-xxs text-red-400'>{errors.seen}</span>)}

                    </div>

                    <div className="col-span-1 flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="type">نوع اعلان</label>
                        <select className='form-input' id="type" value={type} onChange={event => {
                            setType(event.target.value);
                        }}>
                            <option value="warning">warning</option>
                            <option value="success" >success</option>
                            <option value="primary" >primary</option>
                            <option value="info" >info</option>
                            <option value="error" >error</option>
                        </select>
                        {errors.type && (<span className='text-xxs text-red-400'>{errors.type}</span>)}

                    </div>
                    <div className="col-span-1 flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="section">انتخاب بخش</label>
                        <select className='form-input' id="section" value={section} onChange={event => {
                            setSection(event.target.value);
                        }}>
                            <option value="home">خانه</option>
                            <option value="profile" >پروفایل کاربری</option>
                            <option value="accounts" >حساب ها</option>
                        </select>
                        {errors.section && (<span className='text-xxs text-red-400'>{errors.section}</span>)}

                    </div>
                    <div className="col-span-2 flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="message">متن اعلان</label>
                        <textarea className='form-input' rows={5} id="message" value={message} onChange={event => {
                            setMessage(event.target.value);
                        }} />
                        {errors.message && (<span className='text-xxs text-red-400'>{errors.message}</span>)}

                    </div>


                </div>

                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => setDoUserNeedEditNotificationWindow(false)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            انصراف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-yellow-300 flex items-center" onClick={() => handleEditNotification()}>
                            <i className="fa-regular fa-check text-xs lg:text-base ml-2"></i>
                            ویرایش</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default EditNotificationWindow;