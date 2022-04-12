import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeletePayment, getAllPayments } from '../../Redux/Action/Admin/Payments'
import { confirm, notify } from '../../Services/alerts';
import { paginate } from '../../Services/Pagination';
import Pagination from './Pagination';
import { DestroyPayment } from '../../Services/Admin/PaymentsServices'
import EditPaymentWindow from './EditPaymentWindow';
import DetailsPaymentWindow from './DetailsPaymentWindow';
import Payment from './Payment';
import CreatePaymentWindow from './CreatePaymentWindow';

const DashPayments = () => {

    const payments = useSelector(state => state.Payments)
    const [showArr, setShowArr] = useState(payments);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [pagination, setPagination] = useState(paginate(showArr, perPage, currentPage));

    const [searchInp, setSearchInp] = useState("");
    const [searchRes, setSearchRes] = useState([]);
    const [isUserSearching, setIsUserSearching] = useState(false);
    const [payment, setPayment] = useState({});
    const [filterMode, setFilterMode] = useState("all");

    const [doUserNeedCreatePaymentWindow, setDoUserNeedCreatePaymentWindow] = useState(false);
    const [doUserNeedDetailsPaymentWindow, setDoUserNeedDetailsPaymentWindow] = useState(false);
    const [doUserNeedEditPaymentWindow, setDoUserNeedEditPaymentWindow] = useState(false);
    const blurConditions = doUserNeedCreatePaymentWindow || doUserNeedEditPaymentWindow || doUserNeedDetailsPaymentWindow;
    const handleCloseOpenWindow = () => {
        if (doUserNeedCreatePaymentWindow) {
            setDoUserNeedCreatePaymentWindow(false)
        } else if (doUserNeedEditPaymentWindow) {
            setDoUserNeedEditPaymentWindow(false)
        } else {
            setDoUserNeedDetailsPaymentWindow(false)
        }
    }

    const dispatch = useDispatch()

    useState(() => {
        dispatch(getAllPayments())
    }, [])
    useEffect(() => {

        if (isUserSearching) {

            handleSearch(searchInp)
            return
        }

        setShowArr(payments)


    }, [payments])

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

        let results = payments.filter(payment => payment.user_name.toLowerCase().includes(searchFor.toLowerCase()))
        setSearchRes(results)
        setShowArr(results)

        if (searchFor === "") {
            setIsUserSearching(false)
            setShowArr(payments)
        }

    }

    const handleFiltringOnPayments = (filter) => {

        let ordersInstance;

        switch (filter) {
            case "all":
                setFilterMode('all')
                isUserSearching ? setShowArr(searchRes) : setShowArr(payments)
                break;

            case "successful":
                ordersInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(payments)
                let successfulPayments = ordersInstance.filter(pair => pair.status == 1)
                setFilterMode('successful')
                setShowArr(successfulPayments)
                break;
            case "unsuccessful":
                ordersInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(payments)
                let unsuccessfulPayments = ordersInstance.filter(pair => pair.status == 0)
                setFilterMode('unsuccessful')
                setShowArr(unsuccessfulPayments)
                break;
        }
    }

    const handleDelPayment = (payment_id) => {
        confirm('حذف پرداخت', 'آیا می خواهید پرداخت مورد نظر را حذف کنید؟.',
            async () => {
                try {
                    const { status } = await DestroyPayment(payment_id)

                    if (status === 200) {
                        dispatch(DeletePayment(payment_id))
                        notify('پرداخت موردنظر با موفقیت حذف شد', 'success');

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

                <div className="flex justify-between items-center">
                    <h2 className="text-base pb-1 text-gray-600">پرداخت ها</h2>


                    <div
                        className="p-2 rounded-lg bg-white dark:bg-slate-800 dark:text-slate-300 shadow-md flex gap-2 lg:gap-4 items-center">
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'all' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnPayments('all')}>همه</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'successful' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnPayments('successful')}>پرداخت موفق</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'unsuccessful' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnPayments('unsuccessful')}>پرداخت ناموفق</span>
                      

                    </div>
                </div>
                <div className="grid grid-cols-8 gap-2 mt-2 p-2 bg-slate-800 rounded-lg drop-shadow-lg">

                    <div className="col-span-6 md:col-span-7 grid grid-cols-8 bg-slate-700 rounded-lg">

                        <input type="text" onChange={event => handleSearchInp(event)}
                            className="h-full col-span-6 sm:col-span-7 bg-transparent text-sm md:text-lg px-2 focus:outline-none text-slate-300 placeholder:text-slate-500"
                            placeholder="کدوم کاربر؟" />
                        <div className="flex justify-end items-center col-span-2 ml-2 md:ml-3 lg:ml-4 sm:col-span-1">
                            <i className="fa-duotone fa-magnifying-glass text-xl text-slate-500"></i>
                        </div>

                    </div>


                    <button className="col-span-2 md:col-span-1 p-4 text-lg bg-slate-700 rounded-lg" onClick={() => setDoUserNeedCreatePaymentWindow(true)}>
                        <i className="fa-solid fa-plus text-blue-500"></i>
                    </button>
                </div>


                <section className="py-2 mt-2 bg-white dark:bg-slate-800  shadow-md rounded-xl">

                    <table className="border-collapse text-right min-w-full">

                        <thead>
                            <tr
                                className="text-xs lg:text-lg font-semibold border-b border-gray-200 dark:text-slate-500">
                                <th className="py-2 pr-1">#</th>
                                <th className="py-2">نام کاربر</th>
                                <th className="py-2">نام محصول</th>
                                <th className="py-2 hidden sm:block">مبلغ</th>
                                <th className="py-2">وضعیت</th>
                                <th className="py-2">عملیات</th>
                            </tr>

                        </thead>

                        <tbody>

                            {pagination.sliced_array.map(payment => (

                                <Payment iteration={iteration++} key={payment.id} payment={payment} setPayment={setPayment} handleDelPayment={handleDelPayment} setDoUserNeedEditPaymentWindow={setDoUserNeedEditPaymentWindow} setDoUserNeedDetailsPaymentWindow={setDoUserNeedDetailsPaymentWindow} />
                            ))}

                        </tbody>


                    </table>

                    {pagination.total === 0 && (
                        <span className='text-sm block mt-2 text-center w-full text-slate-500'>بدون پرداخت</span>
                    )}

                    {pagination.total <= perPage ? null : (
                        <Pagination currentPage={currentPage} pages={pagination.pages} setCurrentPage={setCurrentPage} total={pagination.total} startIndex={pagination.startIndex} endIndex={pagination.endIndex} />
                    )}

                </section>
            </section>
            {!doUserNeedDetailsPaymentWindow ? null : (<DetailsPaymentWindow setDoUserNeedDetailsPaymentWindow={setDoUserNeedDetailsPaymentWindow} payment={payment} handleDelPayment={handleDelPayment} setDoUserNeedEditPaymentWindow={setDoUserNeedEditPaymentWindow} />)}
            {!doUserNeedEditPaymentWindow ? null : (<EditPaymentWindow setDoUserNeedEditPaymentWindow={setDoUserNeedEditPaymentWindow} payment={payment} />)}
            {!doUserNeedCreatePaymentWindow ? null : (<CreatePaymentWindow setDoUserNeedCreatePaymentWindow={setDoUserNeedCreatePaymentWindow} />)}

            {!blurConditions ? null : (<div className="fixed top-16 left-0 w-full h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => handleCloseOpenWindow()}></div>
            )}
        </Fragment>
    );
}

export default DashPayments;