import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';



const DetailsOrderWindow = ({ setDoUserNeedDetailsOrderWindow, order, handleDelOrder, setDoUserNeedEditOrderWindow }) => {

    const [userInfo, setUserInfo] = useState("")
    const [planName, setPlanName] = useState("")
    const [amount, setAmount] = useState("")
    const [discountAmount, setDiscountAmount] = useState("")
    const [discountInfo, setDiscountInfo] = useState("")
    const [totalAmount, setTotalAmount] = useState("")
    const [orderDate, setOrderDate] = useState("")
    const [status, setStatus] = useState("")
    


    useEffect(() => {
        if (isEmpty(order)) return

        setUserInfo(`${order.user.name} - ${order.user.email}`)
        setPlanName(order.plan_name)
        setAmount(order.amount)
        setDiscountAmount(order.discount_amount)
        setDiscountInfo(order.discount_code)
        setTotalAmount(order.total_amount)
        setOrderDate(order.order_date)
        setStatus(order.status_name)
    }, [order])


    const handleShowEditOrderWindow = () => {
        setDoUserNeedDetailsOrderWindow(false)
        setDoUserNeedEditOrderWindow(true)
    }


    return (
        <section className="absolute top-4 z-40 p-2 w-full">

            <div
                className="grid grid-cols-2 gap-2 mx-2 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900 dark:text-white overflow-hidden">

                <div className="col-span-2 flex justify-between items-center p-2">
                    <h2 className="text-sm">جزییات سفارش</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedDetailsOrderWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>


                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">تاریخ سفارش</span>
                    <span className="text-base">{orderDate}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">نام کاربر</span>
                    <span className="text-base">{userInfo}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">نام محصول</span>
                    <span className="text-base">{planName}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">مبلغ سفارش</span>
                    <span className="text-base">{amount}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">مبلغ تخفیف</span>
                    <span className="text-base">{discountAmount}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">کد تخفیف</span>
                    <span className="text-base">{discountInfo}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">مبلغ نهایی</span>
                    <span className="text-base">{totalAmount}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">وضعیت</span>
                    <span className="text-base">
                    {status}
                    </span>
                </div>
                

                <div className="col-span-2 p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => handleDelOrder(order.id)}>
                            <i className="fa-regular fa-trash text-xs lg:text-base ml-2"></i>
                            حذف</button>
                        
                    </div>
                </div>


            </div>

        </section>
    );
}

export default DetailsOrderWindow;