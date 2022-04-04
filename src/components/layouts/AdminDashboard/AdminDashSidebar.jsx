import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminDashSidebar = () => {
    return (
        <nav
            className="md:block w-3/4 sm:w-1/2 bg-slate-800 h-screen fixed right-0 md:w-1/4 z-50 pb-16 overflow-scroll no-scrollbar">

            <div className="flex flex-col">

                <div className="mt-4 mx-2 pb-4">
                    <ul className="grid gap-y-2">
                        <li>
                            <NavLink to="index"
                                className={(navData) => navData.isActive ? "py-4 px-2 navLinkActive rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300" : "py-4 px-2 rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-house text-xl text-gray-500 dark:text-slate-400"></i>
                                <span className="text-sm mr-2 text-gray-700 dark:text-slate-500">خانه</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="statistics"
                                className={(navData) => navData.isActive ? "py-4 px-2 navLinkActive rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300" : "py-4 px-2 rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-chart-mixed text-xl text-gray-500 dark:text-slate-400"></i>
                                <span className="text-xs mr-2 text-gray-700 dark:text-slate-500">آمار</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="products"
                                className={(navData) => navData.isActive ? "py-4 px-2 navLinkActive rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300" : "py-4 px-2 rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-boxes-stacked text-xl text-gray-500 dark:text-slate-400"></i>
                                <span className="text-xs mr-2 text-gray-700 dark:text-slate-500">محصولات</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="statistics"
                                className={(navData) => navData.isActive ? "py-4 px-2 navLinkActive rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300" : "py-4 px-2 rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-users text-xl text-gray-500 dark:text-slate-400"></i>
                                <span className="text-xs mr-2 text-gray-700 dark:text-slate-500">کاربران</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="statistics"
                                className={(navData) => navData.isActive ? "py-4 px-2 navLinkActive rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300" : "py-4 px-2 rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-comments text-xl text-gray-500 dark:text-slate-400"></i>
                                <span
                                    className="flex justify-between w-full items-center text-xs mr-2 text-gray-700 dark:text-slate-500">نظرات

                                    <span
                                        className="text-xs text-white font-bold p-1 w-6 h-6 flex justify-center items-center rounded-full bg-red-600 dark:bg-red-500 dark:text-gray-300">24</span>

                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="statistics"
                                className={(navData) => navData.isActive ? "py-4 px-2 navLinkActive rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300" : "py-4 px-2 rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-credit-card text-xl text-gray-500 dark:text-slate-400"></i>
                                <span className="text-xs mr-2 text-gray-700 dark:text-slate-500">پرداخت ها</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="statistics"
                                className={(navData) => navData.isActive ? "py-4 px-2 navLinkActive rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300" : "py-4 px-2 rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-coins text-xl text-gray-500 dark:text-slate-400"></i>
                                <span className="text-xs mr-2 text-gray-700 dark:text-slate-500">جفت ارزها</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="profile"
                                className={(navData) => navData.isActive ? "py-4 px-2 navLinkActive rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300" : "py-4 px-2 rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-user text-xl text-gray-500 dark:text-slate-400"></i>
                                <span className="text-xs mr-2 text-gray-700 dark:text-slate-500">پروفایل</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="statistics"
                                className={(navData) => navData.isActive ? "py-4 px-2 navLinkActive rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300" : "py-4 px-2 rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-gears text-xl text-gray-500 dark:text-slate-400"></i>
                                <span className="text-xs mr-2 text-gray-700 dark:text-slate-500">تنظیمات</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/"
                                className="py-4 px-2 border-l-8 rounded-md shadow-md flex items-center bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all ease-out duration-300"
                            >
                                <i className="fa-light fa-gears text-xl text-gray-500 dark:text-slate-400"></i>
                                <span className="text-xs mr-2 text-gray-700 dark:text-slate-500">سایت</span>
                            </NavLink>
                        </li>

                        <li className="mt-2 flex gap-2 items-center">
                            <span className="text-xs dark:text-slate-500">حالت شب</span>
                            <div className="w-12 rounded-full p-1 bg-gray-300 flex items-center justify-start"
                                id="dark-mode">
                                <div className="w-4 h-4 rounded-full bg-slate-900 cursor-pointer">
                                </div>
                            </div>
                        </li>

                        <li className="mt-4">
                            <button
                                className="flex items-center text-gray-500 hover:text-red-500 transition ease-out duration-300">
                                <i className="fa-light fa-right-from-bracket text-lg mr-2"></i>
                                <span className="text-xs mr-2">خروج</span>
                            </button>
                        </li>

                    </ul>
                </div>



            </div>

        </nav>
    );
}

export default AdminDashSidebar;