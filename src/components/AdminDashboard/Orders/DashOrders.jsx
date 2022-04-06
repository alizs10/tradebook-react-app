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

const DashOrders = () => {

    const orders = useSelector(state => state.Orders)
    const [showArr, setShowArr] = useState(orders);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [pagination, setPagination] = useState(paginate(showArr, perPage, currentPage));

    const [searchInp, setSearchInp] = useState("");
    const [searchRes, setSearchRes] = useState([]);
    const [isOrderSearching, setIsOrderSearching] = useState(false);
    const [order, setOrder] = useState({});

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
        dispatch(getAllOrders())
    }, [])
    useEffect(() => {

        if (isOrderSearching) {

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
        setIsOrderSearching(true)
        setSearchInp(event.target.value)
        handleSearch(event.target.value)
    }

    const handleSearch = searchFor => {

        let results = orders.filter(order => order.user_name.toLowerCase().includes(searchFor.toLowerCase()))
        setSearchRes(results)
        setShowArr(results)

        if (searchFor === "") {
            setIsOrderSearching(false)
            setShowArr(orders)
        }

    }


    const handleDelOrder = (order_id) => {
        confirm('حذف سفارش', 'آیا می خواهید سفارش مورد نظر را حذف کنید؟.',
            async () => {
                try {
                    const { status } = await DestroyOrder(order_id)

                    if (status === 200) {
                        dispatch(DeleteOrder(order_id))
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
            <section className="mt-4 mx-2">

                <h2 className="text-base pb-1 text-gray-600">سفارشات</h2>

                <div className="grid grid-cols-8 gap-2 mt-2 p-2 bg-slate-800 rounded-lg drop-shadow-lg">

                    <div className="col-span-6 md:col-span-7 grid grid-cols-8 bg-slate-700 rounded-lg">

                        <input type="text" onChange={event => handleSearchInp(event)}
                            className="h-full col-span-6 sm:col-span-7 bg-transparent text-sm md:text-lg px-2 focus:outline-none text-slate-300 placeholder:text-slate-500"
                            placeholder="کدوم کاربر؟" />
                        <div className="flex justify-end items-center col-span-2 ml-2 md:ml-3 lg:ml-4 sm:col-span-1">
                            <i className="fa-duotone fa-magnifying-glass text-xl text-slate-500"></i>
                        </div>

                    </div>


                    <button className="col-span-2 md:col-span-1 p-4 text-lg bg-slate-700 rounded-lg" onClick={() => setDoUserNeedCreateOrderWindow(true)}>
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

            {!blurConditions ? null : (<div className="fixed top-16 left-0 w-full h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => handleCloseOpenWindow()}></div>
            )}
        </Fragment>
    );
}

export default DashOrders;