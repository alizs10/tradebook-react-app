import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { AddPayment } from '../../Redux/Action/Admin/Payments';
import { notify } from '../../Services/alerts';
import { CreatePayment } from '../../Services/Admin/PaymentsServices';
import { getAllUsers } from '../../Redux/Action/Admin/Users';

const CreatePaymentWindow = ({ setDoUserNeedCreatePaymentWindow }) => {

    const [transactionId, setTransactionId] = useState("")
    const [userId, setUserId] = useState("")
    const [amount, setAmount] = useState("")
    const [paymentDate, setPaymentDate] = useState("")
    const [status, setStatus] = useState("")
    const [type, setType] = useState("")
    const [, forceUpdate] = useState("");


    const users = useSelector(state => state.Users)

    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی می باشد",
            numeric: "باید عدد وارد کنید"
        },
        element: message => <span className='text-xs text-red-400'>{message}</span>
    }));

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllUsers())
    }, [])


    const handleCreatePayment = async () => {
        if (validator.current.allValid()) {
            let newPayment = {
                user_id: userId, transaction_id: transactionId, status, type, amount, payment_date: paymentDate
            }

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


            console.log(newPayment);
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
                    <h2 className="text-sm">جزییات محصول</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedCreatePaymentWindow(false)}>
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
                        <label className="text-xs h-fit">کد پرداخت</label>
                        <input type="text" className="form-input" value={transactionId} onChange={event => {
                            setTransactionId(event.target.value);
                            validator.current.showMessageFor('transaction_id')
                        }} id="transaction_id" />
                        {validator.current.message("transaction_id", transactionId, "required|numeric")}

                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">مبلغ پرداختی</label>
                        <input type="text" className="form-input" value={amount} onChange={event => {
                            setAmount(event.target.value);
                            validator.current.showMessageFor('amount')
                        }} id="amount" />
                        {validator.current.message("amount", amount, "required|numeric")}

                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">تاریخ پرداخت</label>
                        <input type="date" className="form-input" value={paymentDate} onChange={event => {
                            setPaymentDate(event.target.value);
                            validator.current.showMessageFor('paymentDate')
                        }} id="paymentDate" />
                        {validator.current.message("paymentDate", paymentDate, "required")}

                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="status">وضعیت</label>
                        <select className='form-input' id="status" value={status} onChange={event => {
                            setStatus(event.target.value);
                            validator.current.showMessageFor('status')
                        }}>
                            <option value="0">پرداخت نشده</option>
                            <option value="1" >پرداخت شده</option>
                        </select>
                        {validator.current.message("status", status, "required|in:0,1")}
                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="type">نوع پرداخت</label>
                        <select className='form-input' id="type" value={type} onChange={event => {
                            setType(event.target.value);
                            validator.current.showMessageFor('type')
                        }}>
                            <option value="0">پرداخت آنلاین</option>
                            <option value="1" >کارت به کارت</option>
                        </select>
                        {validator.current.message("type", type, "required|in:0,1")}
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