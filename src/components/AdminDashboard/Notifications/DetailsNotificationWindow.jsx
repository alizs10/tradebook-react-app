import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';



const DetailsNotificationWindow = ({ setDoUserNeedDetailsNotificationWindow, notification, handleDelNotification, setDoUserNeedEditNotificationWindow }) => {


    const handleShowEditNotificationWindow = () => {
        setDoUserNeedDetailsNotificationWindow(false)
        setDoUserNeedEditNotificationWindow(true)
    }


    return (
        <section className="absolute top-4 z-40 p-2 w-full">

            <div
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900 dark:text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">جزییات اعلان</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedDetailsNotificationWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>


                <div className='grid grid-cols-2 gap-2'>
                    <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-800">نام کاربر</span>
                        <span className="text-base">{notification.user_name}</span>
                    </div>
                    <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-800">وضعیت</span>
                        <span className="text-base">{notification.seen == 0 ? "فعال" : "غیرفعال"}</span>
                    </div>
                    <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-800">بخش</span>
                        <span className="text-base">{notification.section}</span>
                    </div>
                    <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-800">نوع</span>
                        <span className="text-base">{notification.type}</span>
                    </div>
                    <div className="col-span-2 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-800">متن اعلان</span>
                        <span className="text-base">{notification.message}</span>
                    </div>

                </div>



                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => handleDelNotification(notification.id)}>
                            <i className="fa-regular fa-trash text-xs lg:text-base ml-2"></i>
                            حذف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-yellow-300 flex items-center" onClick={() => handleShowEditNotificationWindow()}>
                            <i className="fa-regular fa-edit text-xs lg:text-base ml-2"></i>
                            ویرایش</button>

                    </div>
                </div>


            </div>

        </section>
    );
}

export default DetailsNotificationWindow;