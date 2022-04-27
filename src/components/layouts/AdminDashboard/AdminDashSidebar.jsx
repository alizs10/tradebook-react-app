import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminDashSidebar = ({ toggleSideBar }) => {
    return (
        <nav
            className="md:block w-3/4 sm:w-1/2 bg-slate-800 h-screen shadow-lg fixed right-0 md:w-1/4 z-20 pb-16 overflow-scroll no-scrollbar">

            <div className="flex flex-col mt-16">

                <div className="mt-4 mx-2 pb-4">
                    <ul className="grid gap-y-2">
                        <li>
                            <NavLink to="/admin" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "py-4 px-2 rounded-lg shadow-md border-l-8 border-emerald-400 flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300" : "py-4 px-2 rounded-lg shadow-md flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300"}
                            end>
                                <i className="fa-light fa-house text-xl text-slate-200"></i>
                                <span className="text-sm mr-2 text-slate-400">خانه</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="products" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "py-4 px-2 rounded-lg shadow-md border-l-8 border-emerald-400 flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300" : "py-4 px-2 rounded-lg shadow-md flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-boxes-stacked text-xl text-slate-200"></i>
                                <span className="text-xs mr-2 text-slate-400">محصولات</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="users" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "py-4 px-2 rounded-lg shadow-md border-l-8 border-emerald-400 flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300" : "py-4 px-2 rounded-lg shadow-md flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-users text-xl text-slate-200"></i>
                                <span className="text-xs mr-2 text-slate-400">کاربران</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="discounts" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "py-4 px-2 rounded-lg shadow-md border-l-8 border-emerald-400 flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300" : "py-4 px-2 rounded-lg shadow-md flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300"}
                            >
                      
                                <i className="fa-light fa-badge-percent text-xl text-slate-200"></i>
                                <span className="text-xs mr-2 text-slate-400">کدهای تخفیف</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="users-plans-values" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "py-4 px-2 rounded-lg shadow-md border-l-8 border-emerald-400 flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300" : "py-4 px-2 rounded-lg shadow-md flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-user-clock text-xl text-slate-200"></i>
                                <span className="text-xs mr-2 text-slate-400">اشتراک کاربران</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="orders" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "py-4 px-2 rounded-lg shadow-md border-l-8 border-emerald-400 flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300" : "py-4 px-2 rounded-lg shadow-md flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-clipboard-list text-xl text-slate-200"></i>
                                <span className="text-xs mr-2 text-slate-400">سفارشات</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="payments" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "py-4 px-2 rounded-lg shadow-md border-l-8 border-emerald-400 flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300" : "py-4 px-2 rounded-lg shadow-md flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-credit-card text-xl text-slate-200"></i>
                                <span className="text-xs mr-2 text-slate-400">پرداخت ها</span>
                            </NavLink>
                        </li>
                        <li>
                        <NavLink to="tickets" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "py-4 px-2 rounded-lg shadow-md border-l-8 border-emerald-400 flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300" : "py-4 px-2 rounded-lg shadow-md flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-ticket-simple text-xl text-slate-200"></i>
                                <span className="text-xs mr-2 text-slate-400">تیکت ها</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="pairs" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "py-4 px-2 rounded-lg shadow-md border-l-8 border-emerald-400 flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300" : "py-4 px-2 rounded-lg shadow-md flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-coins text-xl text-slate-200"></i>
                                <span className="text-xs mr-2 text-slate-400">جفت ارزها</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="profile" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "py-4 px-2 rounded-lg shadow-md border-l-8 border-emerald-400 flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300" : "py-4 px-2 rounded-lg shadow-md flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-user text-xl text-slate-200"></i>
                                <span className="text-xs mr-2 text-slate-400">پروفایل</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="statistics" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "py-4 px-2 rounded-lg shadow-md border-l-8 border-emerald-400 flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300" : "py-4 px-2 rounded-lg shadow-md flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300"}
                            >
                                <i className="fa-light fa-gears text-xl text-slate-200"></i>
                                <span className="text-xs mr-2 text-slate-400">تنظیمات</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/" onClick={() => toggleSideBar()}
                                className="py-4 px-2 border-l-8 rounded-lg shadow-md flex items-center bg-slate-700 hover:bg-slate-600 transition-all ease-out duration-300"
                            >
                                <i className="fa-light fa-globe text-xl text-slate-200"></i>
                                <span className="text-xs mr-2 text-slate-400">سایت</span>
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