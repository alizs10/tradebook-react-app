import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminDashSidebar from './AdminDashSidebar';

const AdmminDashLayout = ({ children }) => {
    const user = useSelector(state => state.User)
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("...");
    const [width, height] = useWindowSize();
    const [doUserWantSidebar, setDoUserWantSidebar] = useState(false)
    useEffect(() => {
        if (isEmpty(user)) return
        setAvatar(user.profile_photo_path)
        setName(user.name)
    }, [user])

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    useEffect(() => {
        if (width > 768 && !doUserWantSidebar) {
            toggleSideBar(true)
        } else if (width < 768 && doUserWantSidebar) {
            toggleSideBar(false)
        }
    }, [width])


    const toggleSideBar = (mode = null) => {
        if (mode !== null) {
            setDoUserWantSidebar(mode)
            return;
        }

        if (width < 768) {
            setDoUserWantSidebar(!doUserWantSidebar)
        }
    }
    return (
        <Fragment>
            <header className="fixed top-0 left-0 flex justify-between py-2 shadow-lg h-16 w-full z-30 bg-slate-800">
                <div className="flex items-center mr-2">

                    <button className="p-2 md:hidden" onClick={() => toggleSideBar()}>
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
                {!doUserWantSidebar ? null : (
                    <AdminDashSidebar toggleSideBar={toggleSideBar}/>
                   
                )}
                <main className='w-full md:w-3/4 relative mt-16'>
                    {children}
                </main>

            </section>



        </Fragment>
    );
}

export default AdmminDashLayout;