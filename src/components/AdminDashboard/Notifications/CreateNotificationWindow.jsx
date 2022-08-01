import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../Services/alerts';
import { SendNotification } from '../../Services/Admin/NotificationsServices';
import { notificationValidation } from '../../Services/Admin/adminValidation';
import { getAllUsers } from '../../Redux/Action/Admin/Users';
import { isEmpty } from 'lodash';

const CreateNotificationWindow = ({ setDoUserNeedCreateNotificationWindow, setNotifications, notifications }) => {

    const [message, setMessage] = useState("")
    const [userId, setUserId] = useState("")
    const [section, setSection] = useState("home")
    const [seen, setSeen] = useState("0")
    const [type, setType] = useState("warning")
    const [errors, setErrors] = useState({})


    const users = useSelector(state => state.Users)

    const dispatch = useDispatch()
    useEffect(() => {
        
        let unmounted = false;

        if (!unmounted) {
            if (isEmpty(users)) {
                dispatch(getAllUsers())
            }
        }

        return () => {
            unmounted = true;
        }
    }, [])


    const handleCreateNotification = async () => {
        let newNotification = {
            message, user_id: userId, type, section, seen
        }
        const { success, errors } = notificationValidation(newNotification);

        if (success) {
            setErrors({})
            try {
                const { data, status } = await SendNotification(newNotification);

                if (status == 200) {
                    setNotifications([data.notification, ...notifications])
                    setDoUserNeedCreateNotificationWindow(false)
                    notify('اعلان جدید با موفقیت اضافه شد', 'success')
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
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-900 text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">اعلان جدید</h2>

                    <button className="p-2 text-lg text-slate-300" onClick={() => setDoUserNeedCreateNotificationWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="grid grid-cols-2 p-2 gap-2">

                    <div className="col-span-1 flex flex-col gap-y-1 rounded-lg bg-slate-800 p-2">
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


                    <div className="col-span-1 flex flex-col gap-y-1 rounded-lg bg-slate-800 p-2">
                        <label htmlFor="seen">وضعیت</label>
                        <select className='form-input' id="seen" value={seen} onChange={event => {
                            setSeen(event.target.value);
                        }}>
                            <option value="0">فعال</option>
                            <option value="1" >غیرفعال</option>
                        </select>
                        {errors.seen && (<span className='text-xxs text-red-400'>{errors.seen}</span>)}

                    </div>

                    <div className="col-span-1 flex flex-col gap-y-1 rounded-lg bg-slate-800 p-2">
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
                    <div className="col-span-1 flex flex-col gap-y-1 rounded-lg bg-slate-800 p-2">
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
                    <div className="col-span-2 flex flex-col gap-y-1 rounded-lg bg-slate-800 p-2">
                        <label htmlFor="message">متن اعلان</label>
                        <textarea className='form-input' rows={5} id="message" value={message} onChange={event => {
                            setMessage(event.target.value);
                        }} />
                        {errors.message && (<span className='text-xxs text-red-400'>{errors.message}</span>)}

                    </div>


                </div>


                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => setDoUserNeedCreateNotificationWindow(false)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            انصراف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-green-500 flex items-center" onClick={() => handleCreateNotification()}>
                            <i className="fa-regular fa-check text-xs lg:text-base ml-2"></i>
                            ثبت</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default CreateNotificationWindow;