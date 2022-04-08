import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = ({ handleLogout, toggleSideBar }) => {

    const user = useSelector(state => state.User)

    const handleProtectedNavLink = (e) => {
        if (user.status == 0)
            e.preventDefault();
        toggleSideBar()
    }

    return (
        <Fragment>
            <nav className=" md:block w-3/4 bg-slate-800 h-screen fixed right-0 md:w-1/4 z-50">

                <div className="mx-2 py-2">
                    <ul className="flex flex-col gap-y-2">
                        <li>
                            <NavLink to="/panel/" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}>
                                <i className="fa-regular fa-home text-2xl text-slate-400 mx-2"></i>
                                <span className="text-base text-slate-300">خانه</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/accounts" onClick={(e) => handleProtectedNavLink(e)}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}>
                                <i className="fa-regular fa-rectangle-history text-2xl text-slate-400 mx-2"></i>
                                <span className="text-base text-slate-300">حساب ها</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/profile" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}>
                                <i className="fa-regular fa-address-card text-2xl text-slate-400 mx-2"></i>
                                <span className="text-base text-slate-300">پروفایل</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/plans" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}>
                                <i className="fa-regular fa-rectangle-pro text-2xl text-slate-400 mx-2"></i>
                                <span className="text-base text-slate-300">اشتراک (رایگان)</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/notebook" onClick={(e) => handleProtectedNavLink(e)}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}>
                                <i className="fa-regular fa-notes text-2xl text-slate-400 mx-2"></i>
                                <span className="text-base text-slate-300">یادداشت ها</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/about" onClick={() => toggleSideBar()}
                                className={(navData) => navData.isActive ? "bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8 border-emerald-400" : "bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300"}
                            >
                                <i className="fa-regular fa-circle-info text-2xl text-slate-400 mx-2"></i>
                                <span className="text-base text-slate-300">درباره ما</span>
                            </NavLink>
                        </li>
                        {parseInt(user.is_admin) === 1 && (
                            <li>
                                <Link to="/admin/index" onClick={() => toggleSideBar()}
                                    className="bg-slate-700 flex items-center  py-4 drop-shadow-lg rounded-lg hover:bg-slate-800 transition ease-out duration-300 border-l-8"
                                >
                                    <i className="fa-regular fa-circle-info text-2xl text-slate-400 mx-2"></i>
                                    <span className="text-base text-slate-300">پنل ادمین</span>
                                </Link>
                            </li>
                        )}

                        <li className="mt-4">
                            <button onClick={handleLogout}
                                className="flex items-center text-slate-400 hover:text-red-400 transition ease-out duration-300">
                                <i className="fa-light fa-right-from-bracket text-2xl mx-2"></i>
                                <span className="text-base">خروج</span>
                            </button>
                        </li>
                    </ul>

                    <footer className="text-center mt-8">
                        <span className="text-xxs text-gray-800">Copyright <i className="fa-regular fa-copyright"></i> 2022
                        </span>
                    </footer>
                </div>
            </nav>
        </Fragment>
    );
}

export default Sidebar;