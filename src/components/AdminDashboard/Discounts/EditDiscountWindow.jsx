import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { EditDiscount } from '../../Redux/Action/Admin/Discounts';
import { notify } from '../../Services/alerts';
import { UpdateDiscount } from '../../Services/Admin/DiscountsServices';
import { getAllUsers } from '../../Redux/Action/Admin/Users';
import { getAllPlans } from '../../Redux/Action/Admin/Plans';

const EditDiscountWindow = ({ setDoUserNeedEditDiscountWindow, discount }) => {

    const [userId, setUserId] = useState("")
    const [planId, setPlanId] = useState("")
    const [code, setCode] = useState("")
    const [value, setValue] = useState("")
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
        if (isEmpty(discount)) return

        setUserId(discount.user_id)
        setPlanId(discount.plan_id)
        setCode(discount.code)
        setValue(discount.value)
        setStatus(`${discount.status}`)
    }, [discount])

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllPlans())
    }, [])

    const handleEditDiscount = async () => {
        if (validator.current.allValid()) {
            let editedDiscount = {
                id: discount.id, user_id: userId, plan_id: planId, code, status, value, _method: "PUT"
            }

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
            validator.current.showMessages();
            forceUpdate(1);
        }
    }

    return (
        <section className="absolute top-4 z-40 p-2 w-full">

            <div
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900 dark:text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">ویرایش کد تخفیف</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedEditDiscountWindow(false)}>
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
                            <option value="">عمومی</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}

                        </select>
                        {validator.current.message("userId", userId, "numeric")}
                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="planId">محصول</label>
                        <select className='form-input' id="planId" value={planId} onChange={event => {
                            setPlanId(event.target.value);
                            validator.current.showMessageFor('planId')
                        }}>
                            <option value="">همه محصولات</option>
                            {plans.map(plan => (
                                <option key={plan.id} value={plan.id}>{plan.name}</option>
                            ))}

                        </select>
                        {validator.current.message("planId", planId, "numeric")}
                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">کد تخفیف</label>
                        <input type="text" className="form-input" value={code} onChange={event => {
                            setCode(event.target.value);
                            validator.current.showMessageFor('code')
                        }} id="code" />
                        {validator.current.message("code", code, "required")}

                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">مقدار</label>
                        <input type="text" className="form-input" value={value} onChange={event => {
                            setValue(event.target.value);
                            validator.current.showMessageFor('value')
                        }} id="value" />
                        {validator.current.message("value", value, "required|numeric")}

                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="status">وضعیت</label>
                        <select className='form-input' id="status" value={status} onChange={event => {
                            setStatus(event.target.value);
                            validator.current.showMessageFor('status')
                        }}>
                            <option value="0">معتبر</option>
                            <option value="1" >منقضی</option>
                        </select>
                        {validator.current.message("status", status, "required|in:0,1")}
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