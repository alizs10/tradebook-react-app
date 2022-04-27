import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ClearUser } from '../Redux/Action/User';
import { logout } from '../Services/AuthService';
import { notify } from '../Services/alerts';
import Sidebar from './Sidebar';
import { isEmpty } from 'lodash';

const PanelLayout = ({ children }) => {

    const [doUserWantSidebar, setDoUserWantSidebar] = useState(false)
    const [width, height] = useWindowSize();

    const user = useSelector(state => state.User)
    const [avatar, setAvatar] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

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


    const toggleSideBar = (mode = null) => {
        if (mode !== null) {
            setDoUserWantSidebar(mode)
            return;
        }

        if (width < 768) {
            setDoUserWantSidebar(!doUserWantSidebar)
        }
    }



    useEffect(() => {
        if (isEmpty(user)) return
        setAvatar(user.profile_photo_path)
    }, [user])

    useEffect(() => {
        if (width > 768 && !doUserWantSidebar) {
            toggleSideBar(true)
        } else if (width < 768 && doUserWantSidebar) {
            toggleSideBar(false)
        }
    }, [width])

    const handleLogout = async () => {

        const { status } = await logout();

        if (status === 200) {
            localStorage.removeItem('token')
            navigate('/')
            dispatch(ClearUser())
            notify('با موفقیت از حساب کاربری خود خارج شدید', 'success')
        } else {
            notify('خطایی رخ داده است، دوباره امتحان کنید', 'danger')
        }

    }



    return (
        <Fragment>
            <header
                className="flex justify-end md:justify-between items-center fixed top-0 left-0 z-50 w-full h-16 bg-slate-900 border-b-2 border-slate-800 shadow-lg">

                <div className="bg-slate-800 hidden md:flex md:w-1/4 h-full">

                    <h1 className="mt-2 font-bold text-2xl mr-2 text-slate-300">پنل کاربری</h1>

                </div>

                <div className="flex justify-between w-full md:w-3/4">

                    <div className="flex gap-x-1">
                        <button className="p-2 md:hidden text-slate-300 text-2xl" onClick={() => toggleSideBar()}>
                            <i className="fa-regular fa-bars-staggered"></i>
                        </button>

                        <div className="flex items-center gap-x-2">

                            {!avatar ? (
                                <span>
                                    <i className='fa-regular fa-user text-slate-300 text-4xl'></i>
                                </span>
                            ) : (<img src={`http://localhost:8000/${avatar}`} alt="avatar" className="rounded-full w-12 h-12 mr-2" />)}
                            <div className="flex flex-col gap-y-2">
                                <span className="text-slate-300 text-sm">{user.name}</span>
                                <span className="text-emerald-400 text-xxs">آنلاین</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <h1 className="ml-2 text-xl md:text-4xl text-slate-100">
                            <span className="text-emerald-400">T</span>rade<span className="text-red-400">B</span>ook<span
                                className="text-xxxs text-slate-300">V 1.0.0</span>
                        </h1>
                    </div>


                </div>

            </header>

            <section className="flex justify-end mt-16">
                {!doUserWantSidebar ? null : (
                    <Sidebar handleLogout={handleLogout} toggleSideBar={toggleSideBar} />
                )}


                <main className="w-full md:w-3/4 relative">
                    {children}
                </main>
            </section>

        </Fragment>
    );
}

export default PanelLayout;