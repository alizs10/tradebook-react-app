import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOrder, getAllOrders } from '../../Redux/Action/Admin/Orders'
import { confirm, notify } from '../../Services/alerts';
import { paginate } from '../../Services/Pagination';
import Pagination from './Pagination';
import { DestroyOrder } from '../../Services/Admin/OrdersServices'
import EditOrderWindow from './EditOrderWindow';
import DetailsOrderWindow from './DetailsOrderWindow';
import Order from './Order';
import CreateOrderWindow from './CreateOrderWindow';
import Helmet from 'react-helmet';

const DashOrders = () => {

    const orders = useSelector(state => state.Orders)
    const [showArr, setShowArr] = useState(orders);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [pagination, setPagination] = useState(paginate(showArr, perPage, currentPage));

    const [searchInp, setSearchInp] = useState("");
    const [searchRes, setSearchRes] = useState([]);
    const [isUserSearching, setIsUserSearching] = useState(false);
    const [order, setOrder] = useState({});
    const [filterMode, setFilterMode] = useState("all");

    const [doUserNeedCreateOrderWindow, setDoUserNeedCreateOrderWindow] = useState(false);
    const [doUserNeedDetailsOrderWindow, setDoUserNeedDetailsOrderWindow] = useState(false);
    const [doUserNeedEditOrderWindow, setDoUserNeedEditOrderWindow] = useState(false);
    const blurConditions = doUserNeedCreateOrderWindow || doUserNeedEditOrderWindow || doUserNeedDetailsOrderWindow;
    const handleCloseOpenWindow = () => {
        if (doUserNeedCreateOrderWindow) {
            setDoUserNeedCreateOrderWindow(false)
        } else if (doUserNeedEditOrderWindow) {
            setDoUserNeedEditOrderWindow(false)
        } else {
            setDoUserNeedDetailsOrderWindow(false)
        }
    }

    const dispatch = useDispatch()

    useState(() => {
     

        let unmounted = false;

        if (!unmounted) {
            dispatch(getAllOrders())

        }

        return () => {
            unmounted = true;
        }
    }, [])
    useEffect(() => {

        if (isUserSearching) {

            handleSearch(searchInp)
            return
        }

        setShowArr(orders)


    }, [orders])

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

        let results = orders.filter(order => order.user_name.toLowerCase().includes(searchFor.toLowerCase()))
        setSearchRes(results)
        setShowArr(results)

        if (searchFor === "") {
            setIsUserSearching(false)
            setShowArr(orders)
        }

    }

    const handleFiltringOnOrders = (filter) => {

        let ordersInstance;

        switch (filter) {
            case "all":
                setFilterMode('all')
                isUserSearching ? setShowArr(searchRes) : setShowArr(orders)
                break;

            case "paid":
                ordersInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(orders)
                let paidOrders = ordersInstance.filter(pair => pair.status == 1)
                setFilterMode('paid')
                setShowArr(paidOrders)
                break;
            case "unsuccessful":
                ordersInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(orders)
                let unsuccessfulOrders = ordersInstance.filter(pair => pair.status == 3)
                setFilterMode('unsuccessful')
                setShowArr(unsuccessfulOrders)
                break;
            case "still":
                ordersInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(orders)
                let stillOrders = ordersInstance.filter(pair => pair.status == 0)
                setFilterMode('still')
                setShowArr(stillOrders)
                break;
            case "canceled":
                ordersInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(orders)
                let canceledOrders = ordersInstance.filter(pair => pair.status == 2)
                setFilterMode('canceled')
                setShowArr(canceledOrders)
                break;

        }
    }

    const handleDelOrder = (order_id) => {
        confirm('حذف سفارش', 'آیا می خواهید سفارش مورد نظر را حذف کنید؟.',
            async () => {
                try {
                    const { status } = await DestroyOrder(order_id)

                    if (status === 200) {
                        dispatch(DeleteOrder(order_id))
                        doUserNeedDetailsOrderWindow && setDoUserNeedDetailsOrderWindow(false)
                        notify('سفارش موردنظر با موفقیت حذف شد', 'success');

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
        <title>سفارشات - تریدبوک</title>
    </Helmet>
            <section className="mt-4 mx-2">

                <div className="flex justify-between items-center">
                    <h2 className="text-base pb-1 text-gray-600">سفارشات</h2>


                    <div
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 shadow-md flex gap-2 lg:gap-4 items-center">
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'all' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnOrders('all')}>همه</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'paid' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnOrders('paid')}>پرداخت شده</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'unsuccessful' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnOrders('unsuccessful')}>پرداخت ناموفق</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'still' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnOrders('still')}>در انتظار پرداخت</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'canceled' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnOrders('canceled')}>لغو شده</span>

                    </div>
                </div>
                <div className="grid grid-cols-8 gap-2 mt-2 p-2 bg-slate-800 rounded-lg drop-shadow-lg">

                    <div className="col-span-6 md:col-span-7 grid grid-cols-8 bg-slate-700 rounded-lg">

                        <input type="text" onChange={event => handleSearchInp(event)}
                            className="h-full col-span-6 sm:col-span-7 bg-transparent text-sm md:text-lg px-2 focus:outline-none text-slate-300 placeholder:text-slate-500"
                            placeholder="کدوم کاربر؟ (نام)" />
                        <div className="flex justify-end items-center col-span-2 ml-2 md:ml-3 lg:ml-4 sm:col-span-1">
                            <i className="fa-duotone fa-magnifying-glass text-xl text-slate-500"></i>
                        </div>

                    </div>


                    <button className="col-span-2 md:col-span-1 p-4 text-lg bg-slate-700 rounded-lg" onClick={() => setDoUserNeedCreateOrderWindow(true)}>
                        <i className="fa-solid fa-plus text-blue-500"></i>
                    </button>
                </div>


                <section className="py-2 mt-2 bg-slate-800  shadow-md rounded-xl">

                    <table className="border-collapse text-right min-w-full">

                        <thead>
                            <tr
                                className="text-xs lg:text-lg font-semibold border-b border-gray-200 text-slate-500">
                                <th className="py-2 pr-1">#</th>
                                <th className="py-2">نام کاربر</th>
                                <th className="py-2">نام محصول</th>
                                <th className="py-2 hidden sm:block">هزینه نهایی</th>
                                <th className="py-2">وضعیت سفارش</th>
                                <th className="py-2">عملیات</th>
                            </tr>

                        </thead>

                        <tbody>

                            {pagination.sliced_array.map(order => (

                                <Order iteration={iteration++} key={order.id} order={order} setOrder={setOrder} handleDelOrder={handleDelOrder} setDoUserNeedEditOrderWindow={setDoUserNeedEditOrderWindow} setDoUserNeedDetailsOrderWindow={setDoUserNeedDetailsOrderWindow} />
                            ))}

                        </tbody>


                    </table>

                    {pagination.total === 0 && (
                        <span className='text-sm block mt-2 text-center w-full text-slate-500'>بدون سفارش</span>
                    )}

                    {pagination.total <= perPage ? null : (
                        <Pagination currentPage={currentPage} pages={pagination.pages} setCurrentPage={setCurrentPage} total={pagination.total} startIndex={pagination.startIndex} endIndex={pagination.endIndex} />
                    )}

                </section>
            </section>
            {!doUserNeedDetailsOrderWindow ? null : (<DetailsOrderWindow setDoUserNeedDetailsOrderWindow={setDoUserNeedDetailsOrderWindow} order={order} handleDelOrder={handleDelOrder} setDoUserNeedEditOrderWindow={setDoUserNeedEditOrderWindow} />)}
            {!doUserNeedEditOrderWindow ? null : (<EditOrderWindow setDoUserNeedEditOrderWindow={setDoUserNeedEditOrderWindow} order={order} />)}
            {!doUserNeedCreateOrderWindow ? null : (<CreateOrderWindow setDoUserNeedCreateOrderWindow={setDoUserNeedCreateOrderWindow} />)}

            {!blurConditions ? null : (<div className="fixed top-16 left-0 w-full md:w-3/4 h-screen backdrop-blur-lg bg-slate-800/70 z-20" onClick={() => handleCloseOpenWindow()}></div>
            )}
        </Fragment>
    );
}

export default DashOrders;