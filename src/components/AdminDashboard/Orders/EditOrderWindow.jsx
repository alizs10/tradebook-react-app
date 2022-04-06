import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { EditOrder } from '../../Redux/Action/Admin/Orders';
import { notify } from '../../Services/alerts';
import { UpdateOrder } from '../../Services/Admin/OrdersServices';

const EditOrderWindow = ({ setDoUserNeedEditOrderWindow, order }) => {

    const [userName, setUserName] = useState("")
    const [planName, setPlanName] = useState("")
    const [amount, setAmount] = useState("")
    const [discountAmount, setDiscountAmount] = useState("")
    const [totalAmount, setTotalAmount] = useState("")
    const [orderDate, setOrderDate] = useState("")
    const [status, setStatus] = useState("")
    const [, forceUpdate] = useState("");
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی می باشد",
            numeric: "باید عدد وارد کنید"
        },
        element: message => <span className='text-xs text-red-400'>{message}</span>
    }));

    const users = useSelector(state => state.Users)
    const plans = useSelector(state => state.Plans)

    useEffect(() => {
        if (isEmpty(order)) return

        setUserName(order.user_name)
        setPlanName(order.plan_name)
        setAmount(order.amount)
        setDiscountAmount(order.amount)
        setTotalAmount(order.amount)
        setOrderDate(order.amount)
        setStatus(order.status)
    }, [order])

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllPlans())
    }, [])

    const handleEditOrder = async () => {
        if (validator.current.allValid()) {
            let editedOrder = {

            }

            try {
                const { data, status } = await UpdateOrder(editedOrder);

                if (status === 200) {
                    console.log(data.order);
                    dispatch(EditOrder(data.order))
                    setDoUserNeedEditOrderWindow(false)
                    notify('سفارش موردنظر با موفقیت ویرایش شد', 'success')
                }
            }

            catch (error) {
                notify('مشکلی پیش آمده است', 'error')
            }

        } else {
            validator.current.showMessages();
            forceUpdate(1);
        }
    }

    return (
        <section className="absolute top-4 z-40 p-2 w-full">

            <div
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900 dark:text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">ویرایش سفارش</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedEditOrderWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="p-2 flex flex-col gap-y-1">
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="userId">کاربر</label>
                        <select className='form-input' id="userId" value={userId} onChange={event => {
                            setUserId(event.target.value);
                            validator.current.showMessageFor('userId')
                        }}>
                            <option value="">کاربر را انتخاب کنید</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}

                        </select>
                        {validator.current.message("userId", userId, "required|numeric")}
                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="planId">محصول</label>
                        <select className='form-input' id="planId" value={planId} onChange={event => {
                            setPlanId(event.target.value);
                            validator.current.showMessageFor('planId')
                        }}>
                            <option value="">محصول را انتخاب کنید</option>
                            {plans.map(plan => (
                                <option key={plan.id} value={plan.id}>{plan.name}</option>
                            ))}

                        </select>
                        {validator.current.message("planId", planId, "required|numeric")}
                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">کد تخفیف</label>
                        <input type="text" className="form-input" value={discountCode} onChange={event => {
                            setDiscountCode(event.target.value);
                            validator.current.showMessageFor('discountCode')
                        }} id="discountCode" />
                        {validator.current.message("discountCode", discountCode, "required")}

                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">تاریخ سفارش</label>
                        <input type="date" className="form-input" value={orderDate} onChange={event => {
                            setOrderDate(event.target.value);
                            validator.current.showMessageFor('orderDate')
                        }} id="orderDate" />
                        {validator.current.message("orderDate", orderDate, "required")}

                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="status">وضعیت</label>
                        <select className='form-input' id="status" value={status} onChange={event => {
                            setStatus(event.target.value);
                            validator.current.showMessageFor('status')
                        }}>
                            <option value="0">لغو شده</option>
                            <option value="1" >پرداخت شده</option>
                        </select>
                        {validator.current.message("status", status, "required|in:0,1")}
                    </div>


                </div>


                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => setDoUserNeedEditOrderWindow(false)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            انصراف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-yellow-300 flex items-center" onClick={() => handleEditOrder()}>
                            <i className="fa-regular fa-check text-xs lg:text-base ml-2"></i>
                            ویرایش</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default EditOrderWindow;