import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditDiscount } from '../../Redux/Action/Admin/Discounts';
import { notify } from '../../Services/alerts';
import { UpdateDiscount } from '../../Services/Admin/DiscountsServices';
import { getAllUsers } from '../../Redux/Action/Admin/Users';
import { getAllPlans } from '../../Redux/Action/Admin/Plans';
import { discountValidation } from '../../Services/Admin/adminValidation';

const EditDiscountWindow = ({ setDoUserNeedEditDiscountWindow, discount }) => {

    const [userId, setUserId] = useState("")
    const [planId, setPlanId] = useState("")
    const [code, setCode] = useState("")
    const [value, setValue] = useState("")
    const [status, setStatus] = useState("0")
    const [expDate, setExpDate] = useState("")
    const [errors, setErrors] = useState({})


    const users = useSelector(state => state.Users)
    const plans = useSelector(state => state.Plans)

    useEffect(() => {
        if (isEmpty(discount)) return

        console.log('here ', discount);
        discount.user_id && setUserId(`${discount.user_id}`)
        discount.plan_id && setPlanId(`${discount.plan_id}`)
        setCode(discount.code)
        setValue(`${discount.value}`)
        setStatus(`${discount.status}`)
        discount.exp_Date && setExpDate(discount.exp_Date)
    }, [discount])

    const dispatch = useDispatch()


    useEffect(() => {


        let unmounted = false;

        if (!unmounted) {
            dispatch(getAllUsers())
            dispatch(getAllPlans())

        }

        return () => {
            unmounted = true;
        }
    }, [])

    const handleEditDiscount = async () => {

        let editedDiscount = {
            id: discount.id, user_id: userId, plan_id: planId, code, status, value, exp_date: expDate, _method: "PUT"
        }
        const { success, errors } = discountValidation(editedDiscount);

        if (success) {
            setErrors({})
            try {
                const { data, status } = await UpdateDiscount(editedDiscount);

                if (status === 200) {
                    console.log(data.discount);
                    dispatch(EditDiscount(data.discount))
                    setDoUserNeedEditDiscountWindow(false)
                    notify('سفارش موردنظر با موفقیت ویرایش شد', 'success')
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
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-900 text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">ویرایش کد تخفیف</h2>

                    <button className="p-2 text-lg text-slate-300" onClick={() => setDoUserNeedEditDiscountWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="p-2 flex flex-col gap-y-1">
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-800 p-2">
                        <label htmlFor="userId">کاربر</label>
                        <select className='form-input' id="userId" value={userId} onChange={event => {
                            setUserId(event.target.value);
                        }}>
                            <option value="">عمومی</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{`${user.name} - ${user.email}`}</option>
                            ))}
                        </select>
                        {errors.user_id && (<span className='text-xxs text-red-400'>{errors.user_id}</span>)}
                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-800 p-2">
                        <label htmlFor="planId">محصول</label>
                        <select className='form-input' id="planId" value={planId} onChange={event => {
                            setPlanId(event.target.value);
                        }}>
                            <option value="">همه محصولات</option>
                            {plans.map(plan => (
                                <option key={plan.id} value={plan.id}>{plan.name}</option>
                            ))}
                        </select>
                        {errors.plan_id && (<span className='text-xxs text-red-400'>{errors.plan_id}</span>)}
                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-800 p-2">
                        <label className="text-xs h-fit">کد تخفیف</label>
                        <input type="text" className="form-input" value={code} onChange={event => {
                            setCode(event.target.value);
                        }} id="code" />
                        {errors.code && (<span className='text-xxs text-red-400'>{errors.code}</span>)}
                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-800 p-2">
                        <label className="text-xs h-fit">مقدار</label>
                        <input type="text" className="form-input" value={value} onChange={event => {
                            setValue(event.target.value);
                        }} id="value" />
                        {errors.value && (<span className='text-xxs text-red-400'>{errors.value}</span>)}
                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-800 p-2">
                        <label htmlFor="status">وضعیت</label>
                        <select className='form-input' id="status" value={status} onChange={event => {
                            setStatus(event.target.value);
                        }}>
                            <option value="0">معتبر</option>
                            <option value="1" >منقضی</option>
                        </select>
                        {errors.status && (<span className='text-xxs text-red-400'>{errors.status}</span>)}
                    </div>

                </div>


                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => setDoUserNeedEditDiscountWindow(false)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            انصراف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-yellow-300 flex items-center" onClick={() => handleEditDiscount()}>
                            <i className="fa-regular fa-check text-xs lg:text-base ml-2"></i>
                            ویرایش</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default EditDiscountWindow;