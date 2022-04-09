import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminDashSidebar from './AdminDashSidebar';

const AdmminDashLayout = ({ children }) => {
    const user = useSelector(state => state.User)
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("...");

    useEffect(() => {
        if (isEmpty(user)) return
        setAvatar(user.profile_photo_path)
        setName(user.name)
    }, [user])
    return (
        <Fragment>
            <header className="flex justify-between py-2 shadow h-16 relative bg-white dark:bg-slate-800">
                <div className="flex items-center mr-2">

                    <button className="p-2 md:hidden">
                        <i className="fa-solid fa-bars-staggered text-xl sm:text-2xl dark:text-slate-300"></i>
                    </button>

                    {!avatar ? (
                        <span>
                            <i className='fa-regular fa-user text-slate-300 text-4xl'></i>
                        </span>
                    ) : (<img src={`http://localhost:8000/${avatar}`} alt="avatar" className="rounded-full w-12 h-12" />)}
                    <div className="flex flex-col gap-y-2 mr-2">
                        <span className="text-slate-300 text-sm">{name}</span>
                        <span className="text-emerald-400 text-xxs">آنلاین</span>
                    </div>
                </div>
                <img src="../images/logo.svg" alt="logo" className="w-24 ml-2" />

            </header>

            <section className="flex justify-end">
                <AdminDashSidebar />
                <main className='w-full md:w-3/4 relative'>
                    {children}
                </main>

            </section>



        </Fragment>
    );
}

export default AdmminDashLayout;