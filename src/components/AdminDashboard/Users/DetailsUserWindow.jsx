import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';



const DetailsUserWindow = ({ setDoUserNeedDetailsUserWindow, user, handleDelUser, setDoUserNeedEditUserWindow }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [avatar, setAvatar] = useState("")
    const [isAdmin, setIsAdmin] = useState("")
    const [status, setStatus] = useState("")
    const [, forceUpdate] = useState("");


    useEffect(() => {
        if (isEmpty(user)) return

        setName(user.name)
        setEmail(user.email)
        setMobile(user.mobile)
        setAvatar(user.profile_photo_path)
        setIsAdmin(user.is_admin)
        setStatus(user.status)
    }, [user])


    const handleShowEditUserWindow = () => {
        setDoUserNeedDetailsUserWindow(false)
        setDoUserNeedEditUserWindow(true)
    }


    return (
        <section className="absolute top-4 z-40 p-2 w-full">

            <div
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900 dark:text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">جزییات محصول</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedDetailsUserWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className='flex justify-center w-full mr-2 mb-2'>
                    {!avatar ? (
                        <span>
                            <i className='fa-regular fa-user text-slate-300 text-4xl'></i>
                        </span>
                    ) : (<img src={`http://localhost:8000/${avatar}`} alt="avatar" className="rounded-full w-52 h-52" />)}
                </div>

                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">نام کاربر</span>
                    <span className="text-base">{name}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">ایمیل کاربر</span>
                    <span className="text-base">{email}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">شماره موبایل کاربر</span>
                    <span className="text-base">{mobile}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">نقش</span>
                    <span className="text-base">
                        {isAdmin === 0 ? "کاربر عادی" : "ادمین"}
                    </span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">وضعیت</span>
                    <span className="text-base">
                        {status === 0 ? "غیر فعال" : "فعال"}
                    </span>
                </div>





                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => handleDelUser(user.id)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            حذف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-yellow-300 flex items-center" onClick={() => handleShowEditUserWindow()}>
                            <i className="fa-regular fa-edit text-xs lg:text-base ml-2"></i>
                            ویرایش</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default DetailsUserWindow;