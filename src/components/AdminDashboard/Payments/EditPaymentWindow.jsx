import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { EditPayment } from '../../Redux/Action/Admin/Payments';
import { notify } from '../../Services/alerts';
import { UpdatePayment } from '../../Services/Admin/PaymentsServices';

const EditPaymentWindow = ({ setDoUserNeedEditPaymentWindow, payment }) => {

    const [userName, setUserName] = useState("")
    const [planName, setPlanName] = useState("")
    const [amount, setAmount] = useState("")
    const [status, setStatus] = useState("")
    const [, forceUpdate] = useState("");
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی می باشد",
            numeric: "باید عدد وارد کنید"
        },
        element: message => <span className='text-xs text-red-400'>{message}</span>
    }));

    useEffect(() => {
        if (isEmpty(payment)) return

        setUserName(payment.user_name)
        setPlanName(payment.plan_name)
        setAmount(payment.amount)
        setStatus(payment.status)
    }, [payment])

    const dispatch = useDispatch()

    const handleEditPayment = async () => {
        if (validator.current.allValid()) {
            let editedPayment = {
               
            }

            try {
                const { data, status } = await UpdatePayment(editedPayment);

                if (status === 200) {
                    console.log(data.payment);
                    dispatch(EditPayment(data.payment))
                    setDoUserNeedEditPaymentWindow(false)
                    notify('پرداخت موردنظر با موفقیت ویرایش شد', 'success')
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
                    <h2 className="text-sm">جزییات پرداخت</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedEditPaymentWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="p-2 flex flex-col gap-y-1">

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">نام پرداخت:</label>
                        <input type="text" className="form-input" value={userName} onChange={event => {
                            setUserName(event.target.value);
                            validator.current.showMessageFor('userName')
                        }} id="userName" />
                        {validator.current.message("userName", userName, "required|string")}

                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">ایمیل:</label>
                        <input type="text" className="form-input" value={planName} onChange={event => {
                            setPlanName(event.target.value);
                            validator.current.showMessageFor('plan_id')
                        }} id="plan_id" />
                        {validator.current.message("plan_id", planName, "required|planName")}

                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">شماره موبایل:</label>
                        <input type="text" className="form-input" value={amount} onChange={event => {
                            setAmount(event.target.value);
                            validator.current.showMessageFor('amount')
                        }} id="amount" />
                        {validator.current.message("amount", amount, "required|numeric|size:11")}

                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="status">وضعیت</label>
                        <select className='form-input' id="status" value={status} onChange={event => {
                            setStatus(event.target.value);
                            validator.current.showMessageFor('status')
                        }}>
                            <option value="0">پرداخت عادی</option>
                            <option value="1" >ادمین</option>
                        </select>
                        {validator.current.message("status", status, "required|in:0,1")}
                    </div>


                </div>


                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => setDoUserNeedEditPaymentWindow(false)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            انصراف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-yellow-300 flex items-center" onClick={() => handleEditPayment()}>
                            <i className="fa-regular fa-check text-xs lg:text-base ml-2"></i>
                            ویرایش</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default EditPaymentWindow;