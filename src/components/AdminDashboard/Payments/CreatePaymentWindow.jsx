import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddPayment } from '../../Redux/Action/Admin/Payments';
import { notify } from '../../Services/alerts';
import { CreatePayment } from '../../Services/Admin/PaymentsServices';
import { getAllOrders } from '../../Redux/Action/Admin/Orders';
import { isEmpty } from 'lodash';
import { paymentValidation } from '../../Services/Admin/adminValidation';

const CreatePaymentWindow = ({ setDoUserNeedCreatePaymentWindow }) => {

    const [orderId, setOrderId] = useState("")
    const [transactionId, setTransactionId] = useState("")
    const [paymentDate, setPaymentDate] = useState("")
    const [status, setStatus] = useState("0")
    const [type, setType] = useState("0")
    const [errors, setErrors] = useState({})


    const [unpaidOrders, setUnpaidOrders] = useState([])


    const orders = useSelector(state => state.Orders)



    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllOrders())
    }, [])

    useEffect(() => {
        if (isEmpty(orders)) return

        let unpaids = orders.filter(order => order.status !== 1)

        setUnpaidOrders(unpaids)
    }, [orders])


    const handleCreatePayment = async () => {
        let newPayment = {
            order_id: orderId, transaction_id: transactionId, status, type, payment_date: paymentDate
        }
        const { success, errors } = paymentValidation(newPayment);

        if (success) {
            setErrors({})
            try {
                const { data, status } = await CreatePayment(newPayment);

                if (status === 200) {
                    dispatch(AddPayment(data.payment))
                    setDoUserNeedCreatePaymentWindow(false)
                    notify('پرداخت جدید با موفقیت اضافه شد', 'success')
                }
            }

            catch (error) {
                notify('مشکلی پیش آمده است', 'error')
            }

        } else {
            setErrors(errors)
        }
    }

    return (
        <section className="absolute top-4 z-40 p-2 w-full">

            <div
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900 dark:text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">پرداخت جدید</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedCreatePaymentWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="p-2 flex flex-col gap-y-1">

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="orderId">سفارش</label>
                        <select className='form-input' id="orderId" value={orderId} onChange={event => {
                            setOrderId(event.target.value);
                        }}>
                            <option value="">سفارش را انتخاب کنید</option>
                            {unpaidOrders.map(order => (
                                <option key={order.id} value={order.id}>{`${order.id} - ${order.user_name} - ${order.plan_name} - ${order.total_amount}`}</option>
                            ))}

                        </select>
                        {errors.order_id && (<span className='text-xxs text-red-400'>{errors.order_id}</span>)}

                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">کد پرداخت</label>
                        <input type="text" className="form-input" value={transactionId} onChange={event => {
                            setTransactionId(event.target.value);
                        }} id="transaction_id" />
                        {errors.transaction_id && (<span className='text-xxs text-red-400'>{errors.transaction_id}</span>)}

                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">تاریخ پرداخت</label>
                        <input type="date" className="form-input" value={paymentDate} onChange={event => {
                            setPaymentDate(event.target.value);
                        }} id="paymentDate" />
                        {errors.payment_date && (<span className='text-xxs text-red-400'>{errors.payment_date}</span>)}


                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="status">وضعیت</label>
                        <select className='form-input' id="status" value={status} onChange={event => {
                            setStatus(event.target.value);
                        }}>
                            <option value="0">پرداخت نشده</option>
                            <option value="1" >پرداخت شده</option>
                        </select>
                        {errors.status && (<span className='text-xxs text-red-400'>{errors.status}</span>)}

                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="type">نوع پرداخت</label>
                        <select className='form-input' id="type" value={type} onChange={event => {
                            setType(event.target.value);
                        }}>
                            <option value="0">پرداخت آنلاین</option>
                            <option value="1" >کارت به کارت</option>
                        </select>
                        {errors.type && (<span className='text-xxs text-red-400'>{errors.type}</span>)}

                    </div>


                </div>


                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => setDoUserNeedCreatePaymentWindow(false)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            انصراف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-green-500 flex items-center" onClick={() => handleCreatePayment()}>
                            <i className="fa-regular fa-check text-xs lg:text-base ml-2"></i>
                            ثبت</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default CreatePaymentWindow;