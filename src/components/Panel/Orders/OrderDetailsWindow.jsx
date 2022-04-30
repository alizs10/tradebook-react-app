import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const OrderDetailsWindow = ({ order, setDoUserWantOrderDetailsWindow }) => {

    const [status, setStatus] = useState("")

    useEffect(() => {
        let unmounted = false;

        if (!unmounted) {
            switch (`${order.status}`) {
                case "0":
                    setStatus("در انتظار پرداخت")
                    break;
                case "1":
                    setStatus("پرداخت شده")
                    break;
                case "2":
                    setStatus("لغو شده")
                    break;
                case "3":
                    setStatus("پرداخت ناموفق")
                    break;

                default:
                    break;
            }

        }

        return () => {
            unmounted = true;
        }
    }, [])

    return (
        <motion.div key="modal"
            initial={{ opacity: 0 }} animate={{ y: 25, x: "-50%", opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-4 left-1/2 w-full md:w-3/4 transform -translate-x-1/2 mt-4 z-50 rounded-lg drop-shadow-lg bg-slate-600">
            <div className="w-full text-slate-100 p-2 flex flex-col gap-y-2">

                <div className="flex justify-between items-center pb-2 border-b-2 border-slate-400">
                    <h2 className="text-base">جزییات سفارش</h2>

                    <button className="p-2 text-base" onClick={() => setDoUserWantOrderDetailsWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="clo-span-1 flex flex-col gap-y-1 p-2 bg-slate-700 rounded-lg">
                        <span className="text-xs md:text-sm text-slate-400 pb-2 border-b-2">نام محصول:</span>
                        <span className="text-sm md:text-base text-slate-300">{order.plan.name}</span>
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1 p-2 bg-slate-700 rounded-lg">
                        <span className="text-xs md:text-sm text-slate-400 pb-2 border-b-2">تاریخ سفارش:</span>
                        <span className="text-sm md:text-base text-slate-300">{order.order_date}</span>
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1 p-2 bg-slate-700 rounded-lg">
                        <span className="text-xs md:text-sm text-slate-400 pb-2 border-b-2">قیمت محصول:</span>
                        <span className="text-sm md:text-base text-slate-300">{order.amount}</span>
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1 p-2 bg-slate-700 rounded-lg">
                        <span className="text-xs md:text-sm text-slate-400 pb-2 border-b-2">مقدار تخفیف:</span>
                        <span className="text-sm md:text-base text-slate-300">{order.discount_amount}</span>
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1 p-2 bg-slate-700 rounded-lg">
                        <span className="text-xs md:text-sm text-slate-400 pb-2 border-b-2">قیمت نهایی:</span>
                        <span className="text-sm md:text-base text-slate-300">{order.total_amount}</span>
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1 p-2 bg-slate-700 rounded-lg">
                        <span className="text-xs md:text-sm text-slate-400 pb-2 border-b-2">وضعیت سفارش:</span>
                        <span className="text-sm md:text-base text-slate-300">{status}</span>
                    </div>

                </div>

                {order.status == 0 && (
                    <div className="mt-4 flex justify-end gap-x-2">
                        <Link to={`${order.id}`} className="px-4 py-2 text-white bg-emerald-700 text-sm md:text-base rounded-lg">پرداخت</Link>
                    </div>
                )}

            </div>
        </motion.div>
    );
}

export default OrderDetailsWindow;