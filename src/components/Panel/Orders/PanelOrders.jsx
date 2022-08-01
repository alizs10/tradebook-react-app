import { AnimatePresence, MotionConfig } from 'framer-motion';
import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserOrders } from '../../Redux/Action/Orders';
import { paginate } from '../../Services/Pagination';
import Order from './Order';
import OrderDetailsWindow from './OrderDetailsWindow';
import Pagination from './Pagination';

import { motion } from 'framer-motion';

const PanelOrders = () => {

    const orders = useSelector(state => state.UserOrders);
    const [showOrders, setShowOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [pagination, setPagination] = useState(paginate(showOrders, perPage, currentPage));
    const [doUserWantOrderDetailsWindow, setDoUserWantOrderDetailsWindow] = useState(false);
    const [filterMode, setFilterMode] = useState("still");
    const dispatch = useDispatch()

    useEffect(() => {
     

        let unmounted = false;

        if (!unmounted) {
            dispatch(getAllUserOrders())

        }

        return () => {
            unmounted = true;
        }
    }, [])

    useEffect(() => {

        if (!isEmpty(orders)) {
            setShowOrders(orders)
            handleFiltringOnOrders("still")
        }

    }, [orders])

    useEffect(() => {
        setPagination(paginate(showOrders, 5, currentPage))

    }, [showOrders])

    useEffect(() => {
        setPagination(paginate(showOrders, 5, currentPage))
    }, [currentPage])

    useEffect(() => {
        if (pagination.pages !== 0 && pagination.pages < currentPage) {
            setCurrentPage(pagination.pages)
        }
    }, [pagination.pages])

    const handleFiltringOnOrders = (filter) => {

        let ordersInstance;

        switch (filter) {
            case "all":
                setFilterMode('all')
                setShowOrders(orders)
                break;

            case "paid":
                ordersInstance = structuredClone(orders)
                let paidOrders = ordersInstance.filter(order => order.status == 1)
                setFilterMode('paid')
                setShowOrders(paidOrders)
                break;
            case "unsuccessful":
                ordersInstance = structuredClone(orders)
                let unsuccessfulOrders = ordersInstance.filter(order => order.status == 3)
                setFilterMode('unsuccessful')
                setShowOrders(unsuccessfulOrders)
                break;
            case "still":
                ordersInstance = structuredClone(orders)
                let stillOrders = ordersInstance.filter(order => order.status == 0)
                setFilterMode('still')
                setShowOrders(stillOrders)
                break;
            case "canceled":
                ordersInstance = structuredClone(orders)
                let canceledOrders = ordersInstance.filter(order => order.status == 2)
                setFilterMode('canceled')
                setShowOrders(canceledOrders)
                break;

        }
    }



    return (
        <Fragment>

            <Helmet>
                <title>سفارشات شما - تریدبوک</title>
            </Helmet>


            <div className="mx-2 mt-4 flex justify-between border-b-2 pb-2">
                <h2 className="text-slate-300 text-lg">سفارشات شما</h2>

                <div
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 shadow-md flex gap-2 lg:gap-4 items-center">
                    <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'all' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnOrders('all')}>همه</span>
                    <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'still' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnOrders('still')}>در انتظار پرداخت</span>
                    <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'paid' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnOrders('paid')}>پرداخت شده</span>
                    <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'unsuccessful' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnOrders('unsuccessful')}>پرداخت ناموفق</span>
                    <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'canceled' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnOrders('canceled')}>لغو شده</span>

                </div>
            </div>

            <div className="flex flex-col gap-y-2 mx-2 mt-2">

                {pagination.total > 0 ? pagination.sliced_array.map(order => (
                    <Order key={order.id} order={order} setOrder={setOrder} setDoUserWantOrderDetailsWindow={setDoUserWantOrderDetailsWindow} />
                )) : (
                    <span className='text-center text-sm text-slate-500'>شما سفارشی ثبت نکرده اید</span>
                )}

            </div>

            {pagination.total <= perPage ? null : (
                <Pagination currentPage={currentPage} pages={pagination.pages} setCurrentPage={setCurrentPage} total={pagination.total} startIndex={pagination.startIndex} endIndex={pagination.endIndex} />
            )}
            <AnimatePresence>
                {doUserWantOrderDetailsWindow && (<OrderDetailsWindow order={order} setDoUserWantOrderDetailsWindow={setDoUserWantOrderDetailsWindow} />)}
                {doUserWantOrderDetailsWindow && (<motion.div exit={{ opacity: 0 }} className="fixed top-0 left-0 w-full md:w-3/4 h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => setDoUserWantOrderDetailsWindow(false)}></motion.div>)}
            </AnimatePresence>
        </Fragment>
    );
}

export default PanelOrders;