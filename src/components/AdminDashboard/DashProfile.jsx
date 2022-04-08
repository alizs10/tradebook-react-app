import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

const DashProfile = () => {

    const user = useSelector(state => state.User)

    return (
        <Fragment>
            <section className="mt-4 mx-2">

                <div className="flex justify-between items-center">
                    <h2 className="text-base pb-1 text-gray-600">پروفایل</h2>
                </div>


                <section className="py-2 mt-2 bg-white dark:bg-slate-800  shadow-md rounded-xl">
                    <div className="flex justify-between mx-2">

                        <div className="flex flex-col gap-y-4">
                            <div className="flex flex-col gap-y-1">
                                <span className="text-xs font-light dark:text-slate-500 dark:text-slate-200">نام و نام خانوداگی:</span>
                                <span className="text-sm font-semibold dark:text-slate-300">{user.name}</span>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <span className="text-xs font-light dark:text-slate-500 dark:text-slate-200">ایمیل:</span>
                                <span className="text-sm font-semibold dark:text-slate-300">{user.email}</span>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <span className="text-xs font-light dark:text-slate-500 dark:text-slate-200">شماره موبایل:</span>
                                <span className="text-sm font-semibold dark:text-slate-300">{user.mobile}</span>
                            </div>

                        </div>

                        {user.profile_photo_path && (<img src={`http://localhost:8000/${user.profile_photo_path}`} alt="avatar" className="rounded-full w-12 h-12" />)}
                    </div>

                    <div className="flex gap-x-2 mt-4 mr-2">
                        <button className="px-4 py-2 rounded-lg text-xs bg-yellow-200 flex items-center">
                            <i className="fa-light fa-pen-to-square text-xs lg:text-base ml-2"></i>
                            ویرایش پروفایل</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center">
                            <i className="fa-light fa-key-skeleton text-xs lg:text-base ml-2"></i>
                            تغییر کلمه عبور</button>
                    </div>


                </section>
            </section>
        </Fragment>
    );
}

export default DashProfile;