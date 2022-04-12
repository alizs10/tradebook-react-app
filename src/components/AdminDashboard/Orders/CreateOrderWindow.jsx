import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddOrder } from '../../Redux/Action/Admin/Orders';
import { notify } from '../../Services/alerts';
import { CreateOrder } from '../../Services/Admin/OrdersServices';
import { getAllUsers } from '../../Redux/Action/Admin/Users';
import { getAllPlans } from '../../Redux/Action/Admin/Plans';
import { orderValidation } from '../../Services/Admin/adminValidation';

const CreateOrderWindow = ({ setDoUserNeedCreateOrderWindow }) => {

    const [userId, setUserId] = useState("")
    const [planId, setPlanId] = useState("")
    const [discountCode, setDiscountCode] = useState("")
    const [orderDate, setOrderDate] = useState("")
    const [errors, setErrors] = useState({})



    const users = useSelector(state => state.Users)
    const plans = useSelector(state => state.Plans)



    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllPlans())
    }, [])


    const handleCreateOrder = async () => {
        let newOrder = {
            user_id: userId, plan_id: planId, order_date: orderDate, discount_code: discountCode
        }
        const { success, errors } = orderValidation(newOrder);

        if (success) {
            setErrors({})
            try {
                const { data, status } = await CreateOrder(newOrder);

                if (status === 200) {
                    dispatch(AddOrder(data.order))
                    setDoUserNeedCreateOrderWindow(false)
                    notify('سفارش جدید با موفقیت اضافه شد', 'success')
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
                    <h2 className="text-sm">جزییات سفارش</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedCreateOrderWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="p-2 flex flex-col gap-y-1">

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="userId">کاربر</label>
                        <select className='form-input' id="userId" value={userId} onChange={event => {
                            setUserId(event.target.value);
                        }}>
                            <option value="">کاربر را انتخاب کنید</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{`${user.name} - ${user.email}`}</option>
                            ))}

                        </select>
                        {errors.user_id && (<span className='text-xxs text-red-400'>{errors.user_id}</span>)}

                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="planId">محصول</label>
                        <select className='form-input' id="planId" value={planId} onChange={event => {
                            setPlanId(event.target.value);
                        }}>
                            <option value="">محصول را انتخاب کنید</option>
                            {plans.map(plan => (
                                <option key={plan.id} value={plan.id}>{plan.name}</option>
                            ))}

                        </select>
                        {errors.plan_id && (<span className='text-xxs text-red-400'>{errors.plan_id}</span>)}

                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">کد تخفیف</label>
                        <input type="text" className="form-input" value={discountCode} onChange={event => {
                            setDiscountCode(event.target.value);
                        }} id="discountCode" />
                        {errors.discount_code && (<span className='text-xxs text-red-400'>{errors.discount_code}</span>)}


                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">تاریخ سفارش</label>
                        <input type="date" className="form-input" value={orderDate} onChange={event => {
                            setOrderDate(event.target.value);
                        }} id="orderDate" />
                        {errors.order_date && (<span className='text-xxs text-red-400'>{errors.order_date}</span>)}


                    </div>

                </div>


                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => setDoUserNeedCreateOrderWindow(false)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            انصراف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-green-500 flex items-center" onClick={() => handleCreateOrder()}>
                            <i className="fa-regular fa-check text-xs lg:text-base ml-2"></i>
                            ثبت</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default CreateOrderWindow;