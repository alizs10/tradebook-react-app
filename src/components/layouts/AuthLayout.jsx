import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import { AuthData } from '../Auth/AuthContext';

const AuthLayouts = ({ children }) => {

    const location = useLocation()

    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")

    return (
        <Fragment>

            <header className="py-2 mx-2 flex justify-end">
                <h1 className="text-xl md:text-4xl text-slate-100">
                    <span className="text-emerald-400">T</span>rade<span className="text-red-400">B</span>ook<span
                        className="text-xxxs text-slate-300">V 1.0.0</span>
                </h1>
            </header>

            <main className='bg-slate-900'>

                <section className="flex flex-col items-center md:flex-row gap-y-8 mt-4 md:mt-10">

                    <div className="flex flex-col gap-y-4 text-center w-full md:w-1/2 text-slate-300">
                        <h1 className="text-4xl leading-10">به <span className="text-emerald-400">ترید</span>بوک خوش آمدید</h1>
                        <span className="text-sm text-red-400">اولین وب اپلیکیشن مدیریت معامله</span>
                        <span className="text-xs">برای استفاده از امکانات این اپلیکیشن ابتدا باید عضو شوید</span>
                    </div>


                    <div className="text-slate-300 w-full md:w-1/2 lg:flex lg:justify-center">

                        <div className="flex flex-col gap-y-4 mx-2 lg:w-1/2">


                            {location.pathname === "/forgot-password" ? (
                                <div className="flex gap-x-4">
                                    <a href="" className="text-base pb-1 link-active">بازیابی کلمه عبور</a>
                                    <NavLink to='/' className={(navData) => navData.isActive ? "text-base pb-1 link-active" : ""}>ورود</NavLink>
                                </div>
                            ) : null}
                            {location.pathname === "/reset-password" ? (
                                <div className="flex gap-x-4">
                                    <h2 className="text-base">تغییر کلمه عبور</h2>
                                </div>
                            ) : null}
                            {location.pathname === "/" || location.pathname === "/register" ? (
                                <div className="flex gap-x-4">
                                    <NavLink to='/' className={(navData) => navData.isActive ? "text-base pb-1 link-active" : ""}>ورود</NavLink>
                                    <NavLink to='/register' className={(navData) => navData.isActive ? "text-base pb-1 link-active" : ""}>ثبت نام</NavLink>
                                </div>
                            ) : null}


                            <AuthData.Provider value={{ email, setEmail, password, setPassword }}>
                                {children}
                            </AuthData.Provider>



                        </div>

                    </div>



                </section>


            </main>

            <footer className="text-center mt-8">
                <span className="text-xxs text-slate-500">Copyright <i className="fa-regular fa-copyright"></i> 2022</span>
            </footer>
        </Fragment>
    );
}

export default AuthLayouts;