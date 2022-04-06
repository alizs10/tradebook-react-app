import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAdminPair, getAllAdminPairs } from '../../Redux/Action/Admin/AdminPairs';
import { confirm, notify } from '../../Services/alerts';
import { paginate } from '../../Services/Pagination';
import CreateAdminPairWindow from './CreateAdminPairWindow';
import Pagination from './Pagination';
import AdminPair from './AdminPair';
import {DestroyAdminPair} from '../../Services/Admin/AdminPairsServices'
import EditAdminPairWindow from './EditAdminPairWindow';
import DetailsAdminPairWindow from './DetailsAdminPairWindow';

const DashAdminPairs = () => {

    const adminPairs = useSelector(state => state.AdminPairs)
    const [showArr, setShowArr] = useState(adminPairs);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [pagination, setPagination] = useState(paginate(showArr, perPage, currentPage));
    
    const [searchInp, setSearchInp] = useState("");
    const [searchRes, setSearchRes] = useState([]);
    const [isUserSearching, setIsUserSearching] = useState(false);
    const [adminPair, setAdminPair] = useState({});

    const [doUserNeedDetailsAdminPairWindow, setDoUserNeedDetailsAdminPairWindow] = useState(false);
    const [doUserNeedEditAdminPairWindow, setDoUserNeedEditAdminPairWindow] = useState(false);
    const [doUserNeedCreateAdminPairWindow, setDoUserNeedCreateAdminPairWindow] = useState(false);
    const blurConditions = doUserNeedCreateAdminPairWindow || doUserNeedEditAdminPairWindow || doUserNeedDetailsAdminPairWindow;
    const handleCloseOpenWindow = () => {
        if (doUserNeedCreateAdminPairWindow) {
            setDoUserNeedCreateAdminPairWindow(false)
        } else if (doUserNeedEditAdminPairWindow) {
            setDoUserNeedEditAdminPairWindow(false)
        } else {
            setDoUserNeedDetailsAdminPairWindow(false)
        }
    }

    const dispatch = useDispatch()

    useState(() => {
        dispatch(getAllAdminPairs())
    }, [])
    useEffect(() => {

        if (isUserSearching) {

            handleSearch(searchInp)
            return
        }

        setShowArr(adminPairs)


    }, [adminPairs])

    useEffect(() => {
        setPagination(paginate(showArr, 5, currentPage))
    }, [showArr])

    useEffect(() => {
        setPagination(paginate(showArr, 5, currentPage))
    }, [currentPage])

    useEffect(() => {
        if (pagination.pages !== 0 && pagination.pages < currentPage) {
            setCurrentPage(pagination.pages)
        }
    }, [pagination.pages])


    var iteration = pagination.startIndex + 1;

    const handleSearchInp = event => {
        setIsUserSearching(true)
        setSearchInp(event.target.value)
        handleSearch(event.target.value)
    }

    const handleSearch = searchFor => {

        let results = adminPairs.filter(product => product.name.toLowerCase().includes(searchFor.toLowerCase()))
        setSearchRes(results)
        setShowArr(results)

        if (searchFor === "") {
            setIsUserSearching(false)
            setShowArr(adminPairs)
        }

    }


    const handleDelAdminPair = (adminPair_id) => {
        confirm('حذف محصول', 'آیا می خواهید محصول مورد نظر را حذف کنید؟.',
            async () => {
                try {
                    const { status } = await DestroyAdminPair(adminPair_id)

                    if (status === 200) {
                        dispatch(DeleteAdminPair(adminPair_id))
                        if(doUserNeedDetailsAdminPairWindow) setDoUserNeedDetailsAdminPairWindow(false)
                        notify('جفت ارز شما با موفقیت حذف شد', 'success');

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
            <section className="mt-4 mx-2">

                <h2 className="text-base pb-1 text-gray-600">جفت ارزها</h2>

                <div className="grid grid-cols-8 gap-2 mt-2 p-2 bg-slate-800 rounded-lg drop-shadow-lg">

                    <div className="col-span-6 md:col-span-7 grid grid-cols-8 bg-slate-700 rounded-lg">

                        <input type="text" onChange={event => handleSearchInp(event)}
                            className="h-full col-span-6 sm:col-span-7 bg-transparent text-sm md:text-lg px-2 focus:outline-none text-slate-300 placeholder:text-slate-500"
                            placeholder="کدوم محصول؟ (نام)" />
                        <div className="flex justify-end items-center col-span-2 ml-2 md:ml-3 lg:ml-4 sm:col-span-1">
                            <i className="fa-duotone fa-magnifying-glass text-xl text-slate-500"></i>
                        </div>

                    </div>


                    <button className="col-span-2 md:col-span-1 p-4 text-lg bg-slate-700 rounded-lg" onClick={() => setDoUserNeedCreateAdminPairWindow(true)}>
                        <i className="fa-solid fa-plus text-blue-500"></i>
                    </button>
                </div>


                <section className="py-2 mt-2 bg-white dark:bg-slate-800  shadow-md rounded-xl">

                    <table className="border-collapse text-right min-w-full">

                        <thead>
                            <tr
                                className="text-xs lg:text-lg font-semibold border-b border-gray-200 dark:text-slate-500">
                                <th className="py-2 pr-1">#</th>
                                <th className="py-2">نام</th>
                                <th className="py-2">نوع</th>
                                <th className="py-2">وضعیت</th>
                                <th className="py-2">عملیات</th>
                            </tr>

                        </thead>

                        <tbody>

                            {pagination.sliced_array.map(adminPair => (

                                <AdminPair iteration={iteration++} key={adminPair.id} adminPair={adminPair} setAdminPair={setAdminPair} handleDelAdminPair={handleDelAdminPair} setDoUserNeedEditAdminPairWindow={setDoUserNeedEditAdminPairWindow} setDoUserNeedDetailsAdminPairWindow={setDoUserNeedDetailsAdminPairWindow} />
                            ))}

                        </tbody>


                    </table>

                    {pagination.total === 0 && (
                        <span className='text-sm block mt-2 text-center w-full text-slate-500'>بدون محصول</span>
                    )}

                    {pagination.total <= perPage ? null : (
                        <Pagination currentPage={currentPage} pages={pagination.pages} setCurrentPage={setCurrentPage} total={pagination.total} startIndex={pagination.startIndex} endIndex={pagination.endIndex} />
                    )}

                </section>
            </section>
            {!doUserNeedDetailsAdminPairWindow ? null : (<DetailsAdminPairWindow setDoUserNeedDetailsAdminPairWindow={setDoUserNeedDetailsAdminPairWindow} adminPair={adminPair} handleDelAdminPair={handleDelAdminPair} setDoUserNeedEditAdminPairWindow={setDoUserNeedEditAdminPairWindow} />)}
            {!doUserNeedEditAdminPairWindow ? null : (<EditAdminPairWindow setDoUserNeedEditAdminPairWindow={setDoUserNeedEditAdminPairWindow} adminPair={adminPair} />)}
            {!doUserNeedCreateAdminPairWindow ? null : (<CreateAdminPairWindow setDoUserNeedCreateAdminPairWindow={setDoUserNeedCreateAdminPairWindow} />)}

            {!blurConditions ? null : (<div className="fixed top-16 left-0 w-full h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => handleCloseOpenWindow()}></div>
            )}
        </Fragment>
    );
}

export default DashAdminPairs;