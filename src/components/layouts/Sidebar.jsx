import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { notify } from '../Services/alerts';

const Sidebar = ({ handleLogout, toggleSideBar }) => {
    let zarinpal_logo = require("./Zarinpal.svg");
    const user = useSelector(state => state.User)

    const handleProtectedNavLink = (e) => {
        if (user.status == 0)
        {
            e.preventDefault();
            notify("حساب کاربری شما فعال نمی باشد", "warning")
        }
         
        toggleSideBar()
    }

    return (
        <Fragment>
            <nav className="md:block w-1/2 pb-4 bg-slate-800 h-screen fixed right-0 md:w-1/4 z-50 overflow-scroll no-scrollbar">

                <div className="mx-2 py-2">
                    <ul className="flex flex-col gap-y-2">
                        <li>
                            <NavLink to="/panel/" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}>
                                <i className="fa-regular fa-home text-xl text-slate-400 mx-2"></i>
                                <span className="text-sm text-slate-300">خانه</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/accounts" onClick={(e) => handleProtectedNavLink(e)}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}>
                                <i className="fa-regular fa-rectangle-history text-xl text-slate-400 mx-2"></i>
                                <span className="text-sm text-slate-300">حساب ها</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/profile" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}>
                                <i className="fa-regular fa-address-card text-xl text-slate-400 mx-2"></i>
                                <span className="text-sm text-slate-300">پروفایل</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/plans" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}>
                                <i className="fa-regular fa-rectangle-pro text-xl text-slate-400 mx-2"></i>
                                <span className="text-sm text-slate-300">اشتراک ها</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/orders" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}>
                                <i className="fa-regular fa-clipboard-list-check text-xl text-slate-400 mx-2"></i>
                                <span className="text-sm text-slate-300">سفارشات</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/notebook" onClick={(e) => handleProtectedNavLink(e)}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}>
                                <i className="fa-regular fa-notes text-xl text-slate-400 mx-2"></i>
                                <span className="text-sm text-slate-300">یادداشت ها</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/tickets" onClick={(e) => handleProtectedNavLink(e)}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}>
                                <i className="fa-regular fa-ticket-simple text-xl text-slate-400 mx-2"></i>
                                <span className="text-sm text-slate-300">تیکت ها</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/about" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}
                            >
                                <i className="fa-regular fa-circle-info text-xl text-slate-400 mx-2"></i>
                                <span className="text-sm text-slate-300">درباره ما</span>
                            </NavLink>
                        </li>
                        {user.is_admin == 1 && (
                            <li>
                                <Link to="/admin" onClick={() => toggleSideBar()}
                                    className="bg-slate-700 flex items-center  py-3 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8"
                                >
                                    <i className="fa-regular fa-user-gear text-xl text-slate-400 mx-2"></i>
                                    <span className="text-sm text-slate-300">پنل ادمین</span>
                                </Link>
                            </li>
                        )}

                        <li className="mt-4">
                            <button onClick={handleLogout}
                                className="flex items-center text-slate-400 hover:text-red-400 transition ease-out duration-300">
                                <i className="fa-light fa-right-from-bracket text-xl mx-2"></i>
                                <span className="text-sm">خروج</span>
                            </button>
                        </li>
                    </ul>

                    <footer className="text-center mt-8 flex flex-col gap-y-8">

                        <div className="flex justify-evenly">
                            <div className="w-10 md:w-12">
                                <img src={zarinpal_logo.default} alt='zarinpal-logo' />
                            </div>
                            <div className="flex flex-col gap-y-4 md:gap-y-6">
                                <span className="text-xxs md:text-xs text-slate-300">ما را در شبکه های اجتماعی دنبال کنید</span>
                                <div className="grid grid-cols-4 text-right">
                                    <a href="https://t.me/alizs10" target="_blank"
                                        className="col-span-1 text-blue-400 text-sm md:text-lg">
                                        <i className="fa-brands fa-telegram text-2xl mr-1"></i>
                                    </a>
                                    <a href="https://instagram.com/alizs10" target="_blank"
                                        className="col-span-1 text-pink-600 text-sm md:text-lg">
                                        <i className="fa-brands fa-instagram text-2xl mr-1"></i>
                                    </a>
                                    <a href="https://wa.me/09392983010" target="_blank"
                                        className="col-span-1 text-green-400 text-sm md:text-lg">
                                        <i className="fa-brands fa-whatsapp text-2xl mr-1"></i></a>
                                    <a href="mailto:alizswork@gmail.com" target="_blank"
                                        className="col-span-1 text-red-600 text-sm md:text-lg">
                                        <i className="fa-brands fa-google text-2xl mr-1"></i></a>
                                </div>
                            </div>
                        </div>
                        <span className="text-xxs text-gray-500">Copyright <i className="fa-regular fa-copyright"></i> 2022
                        </span>
                    </footer>
                </div>
            </nav>
        </Fragment>
    );
}

export default Sidebar;