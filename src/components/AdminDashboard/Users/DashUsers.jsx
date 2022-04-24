import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUser, getAllUsers } from '../../Redux/Action/Admin/Users'
import { confirm, notify } from '../../Services/alerts';
import { paginate } from '../../Services/Pagination';
import Pagination from './Pagination';
import { DestroyUser } from '../../Services/Admin/UsersServices'
import EditUserWindow from './EditUserWindow';
import DetailsUserWindow from './DetailsUserWindow';
import User from './User';
import Helmet from 'react-helmet';
const DashUsers = () => {

    const users = useSelector(state => state.Users)
    const [showArr, setShowArr] = useState(users);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [pagination, setPagination] = useState(paginate(showArr, perPage, currentPage));

    const [searchInp, setSearchInp] = useState("");
    const [searchRes, setSearchRes] = useState([]);
    const [isUserSearching, setIsUserSearching] = useState(false);
    const [user, setUser] = useState({});
    const [filterMode, setFilterMode] = useState("all");

    const [doUserNeedDetailsUserWindow, setDoUserNeedDetailsUserWindow] = useState(false);
    const [doUserNeedEditUserWindow, setDoUserNeedEditUserWindow] = useState(false);
    const blurConditions = doUserNeedEditUserWindow || doUserNeedDetailsUserWindow;
    const handleCloseOpenWindow = () => {
        if (doUserNeedEditUserWindow) {
            setDoUserNeedEditUserWindow(false)
        } else {
            setDoUserNeedDetailsUserWindow(false)
        }
    }

    const dispatch = useDispatch()

    useState(() => {
        dispatch(getAllUsers())
    }, [])
    useEffect(() => {

        if (isUserSearching) {

            handleSearch(searchInp)
            return
        }

        setShowArr(users)


    }, [users])

    useEffect(() => {
        setPagination(paginate(showArr, 5, currentPage))
    }, [showArr])

    useEffect(() => {
        setPagination(paginate(showArr, 5, currentPage))
    }, [currentPage])

    var iteration = pagination.startIndex + 1;

    const handleSearchInp = event => {
        setIsUserSearching(true)
        setSearchInp(event.target.value)
        handleSearch(event.target.value)
    }

    const handleSearch = searchFor => {

        let results = users.filter(user => user.name.toLowerCase().includes(searchFor.toLowerCase()))
        setSearchRes(results)
        setShowArr(results)

        if (searchFor === "") {
            setIsUserSearching(false)
            setShowArr(users)
        }

    }

    const handleFiltringOnUsers = (filter) => {

        let usersInstance;

        switch (filter) {
            case "all":
                setFilterMode('all')
                isUserSearching ? setShowArr(searchRes) : setShowArr(users)
                break;

            case "admin":
                usersInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(users)
                let adminUsers = usersInstance.filter(pair => pair.is_admin == 1)
                setFilterMode('admin')
                setShowArr(adminUsers)
                break;
            case "customer":
                usersInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(users)
                let cusomerUsers = usersInstance.filter(pair => pair.is_admin == 0)
                setFilterMode('customer')
                setShowArr(cusomerUsers)
                break;
        }
    }

    const handleDelUser = (user_id) => {
        confirm('حذف کاربر', 'آیا می خواهید کاربر مورد نظر را حذف کنید؟.',
            async () => {
                try {
                    const { status } = await DestroyUser(user_id)

                    if (status === 200) {
                        dispatch(DeleteUser(user_id))
                        notify('کاربر موردنظر با موفقیت حذف شد', 'success');

                    } else {
                        notify('مشکلی پیش آمده است، دوباره امتحان کنید', 'error');
                    }
                } catch (error) {
                    notify('مشکلی پیش آمده است، دوباره امتحان کنید', 'error');
                }
            },
            function () {
                notify('درخواست شما لغو شد', 'warning');
            }
        )
    }

    return (
        <Fragment>

            <Helmet>
                <title>کاربران - تریدبوک</title>
            </Helmet>
            <section className="mt-4 mx-2">

                <div className="flex justify-between items-center">
                    <h2 className="text-base pb-1 text-gray-600">کاربران</h2>


                    <div
                        className="p-2 rounded-lg bg-white dark:bg-slate-800 dark:text-slate-300 shadow-md flex gap-2 lg:gap-4 items-center">
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'all' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnUsers('all')}>همه</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'admin' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnUsers('admin')}>ادمین</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'customer' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnUsers('customer')}>کاربر عادی</span>


                    </div>
                </div>
                <div className="grid grid-cols-8 gap-2 mt-2 p-2 bg-slate-800 rounded-lg drop-shadow-lg">



                    <input type="text" onChange={event => handleSearchInp(event)}
                        className="h-full col-span-6 sm:col-span-7 bg-transparent text-sm md:text-lg px-2 focus:outline-none text-slate-300 placeholder:text-slate-500"
                        placeholder="کدوم کاربر؟ (نام)" />
                    <div className="flex justify-end items-center col-span-2 ml-2 md:ml-3 lg:ml-4 sm:col-span-1">
                        <i className="fa-duotone fa-magnifying-glass text-xl text-slate-500"></i>
                    </div>





                </div>


                <section className="py-2 mt-2 bg-white dark:bg-slate-800  shadow-md rounded-xl">

                    <table className="border-collapse text-right min-w-full">

                        <thead>
                            <tr
                                className="text-xs lg:text-lg font-semibold border-b border-gray-200 dark:text-slate-500">
                                <th className="py-2 pr-1">#</th>
                                <th className="py-2">نام کاربر</th>
                                <th className="py-2">ایمیل</th>
                                <th className="py-2 hidden sm:block">شماره تلفن</th>
                                <th className="py-2">نقش</th>
                                <th className="py-2">عملیات</th>
                            </tr>

                        </thead>

                        <tbody>

                            {pagination.sliced_array.map(user => (

                                <User iteration={iteration++} key={user.id} user={user} setUser={setUser} handleDelUser={handleDelUser} setDoUserNeedEditUserWindow={setDoUserNeedEditUserWindow} setDoUserNeedDetailsUserWindow={setDoUserNeedDetailsUserWindow} />
                            ))}

                        </tbody>


                    </table>

                    {pagination.total === 0 && (
                        <span className='text-sm block mt-2 text-center w-full text-slate-500'>بدون کاربر</span>
                    )}

                    {pagination.total <= perPage ? null : (
                        <Pagination currentPage={currentPage} pages={pagination.pages} setCurrentPage={setCurrentPage} total={pagination.total} startIndex={pagination.startIndex} endIndex={pagination.endIndex} />
                    )}

                </section>
            </section>
            {!doUserNeedDetailsUserWindow ? null : (<DetailsUserWindow setDoUserNeedDetailsUserWindow={setDoUserNeedDetailsUserWindow} user={user} handleDelUser={handleDelUser} setDoUserNeedEditUserWindow={setDoUserNeedEditUserWindow} />)}
            {!doUserNeedEditUserWindow ? null : (<EditUserWindow setDoUserNeedEditUserWindow={setDoUserNeedEditUserWindow} user={user} />)}

            {!blurConditions ? null : (<div className="fixed top-16 left-0 w-full h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => handleCloseOpenWindow()}></div>
            )}
        </Fragment>
    );
}

export default DashUsers;