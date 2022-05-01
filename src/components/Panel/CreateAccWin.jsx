import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts } from '../Redux/Action/Accounts';
import { CreateAcc } from '../Services/AccSevices';
import { notify } from '../Services/alerts';
import { accValidation } from '../Services/validation';

import { motion } from 'framer-motion';
import { isEmpty } from 'lodash';
import { BeatLoader } from 'react-spinners';

const CreateAccWin = ({ setDoUserWantCreateAccWin }) => {

    const [loading, setLoading] = useState(false)

    const [accName, setAccName] = useState("");
    const [accType, setAccType] = useState("0");
    const [accBalance, setAccBalance] = useState("");
    const [accCreatedDate, setAccCreatedDate] = useState("");
    const [errors, setErrors] = useState({})

    const user = useSelector(state => state.User);
    const dispatch = useDispatch()

    const handleCreateAcc = async () => {

        if (loading) {
            notify('سیستم در حال انجام درخواست شما می باشد، صبر کنید', 'warning')
            return
        }
        setLoading(true)

        const acc = { name: accName, balance: accBalance, type: accType, user_id: user.id, account_created_at: accCreatedDate };
        const { success, errors } = accValidation(acc);
        if (success) {
            setErrors({})
            try {
                const { status } = await CreateAcc(acc);
                if (status === 201) {
                    dispatch(getAllAccounts());
                    setDoUserWantCreateAccWin(false);
                    notify('حساب جدید شما با موفقیت ساخته شد', 'success')
                   
                } else {
                    notify('مشکلی پیش آمده است، دوباره امتحان کنید', 'error')
                }
            } catch (e) {
                var error = Object.assign({}, e);
                if (isEmpty(error.response)) {
                    if (error.isAxiosError) {
                        notify('مشکلی در برقراری ارتباط رخ داده است، از اتصال خود به اینترنت اطمینان حاصل کنید', 'error')
                    }
                } else {
                    if (error.response.status === 422) {
                        let errorsObj = error.response.data.errors;
                        let errorsArr = [];

                        Object.keys(errorsObj).map(key => {
                            errorsArr[key] = errorsObj[key][0]
                        })
                        setErrors(errorsArr)
                        notify('اطلاعات وارد شده صحیح نمی باشد', 'error')
                    } else {
                        notify('مشکلی رخ داده است', 'error')
                    }
                }
            }

        } else {
            setErrors(errors)
        }
        setLoading(false)
    }

    return (

        <motion.div key="modal"
            initial={{ opacity: 0 }} animate={{ y: 25, x: "-50%", opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-0 left-1/2 w-4/5 transform -translate-x-1/2 mt-4 z-50 rounded-lg drop-shadow-lg bg-slate-600" >
            <div className="w-full text-slate-100 p-2 flex flex-col gap-y-2">

                <div className="flex justify-between items-center pb-2 border-b-2 border-slate-400">
                    <h2 className="text-base">حساب جدید</h2>

                    <button className="p-2 text-base" onClick={() => setDoUserWantCreateAccWin(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label htmlFor="name">نام حساب</label>
                        <input type="text" className="form-input" id="name" onChange={(event) => setAccName(event.target.value)} />
                        {errors.name && (<span className='text-xxs text-red-400'>{errors.name}</span>)}
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label htmlFor="balance">بالانس اولیه ی حساب</label>
                        <input type="text" className="form-input" id="balance" onChange={(event) => setAccBalance(event.target.value)} />
                        {errors.balance && (<span className='text-xxs text-red-400'>{errors.balance}</span>)}
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label htmlFor="acc_created_date">تاریخ ساخت حساب</label>
                        <input type="date" className="form-input" id="acc_created_date" onChange={(event) => setAccCreatedDate(event.target.value)} />
                        {errors.account_created_at && (<span className='text-xxs text-red-400'>{errors.account_created_at}</span>)}
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label htmlFor="type">نوع حساب</label>
                        <select className="form-input" id="type" value={accType} onChange={(event) => setAccType(event.target.value)}>
                            <option value="0">کریپتوکارنسی</option>
                            <option value="1">فارکس</option>
                        </select>
                        {errors.type && (<span className='text-xxs text-red-400'>{errors.type}</span>)}
                    </div>
                </div>

                <div className="mt-4 flex justify-end">

                    <button className="px-4 py-2 rounded-lg text-base bg-emerald-400 text-slate-900 flex justify-center items-center" onClick={() => handleCreateAcc()}>
                        {loading ? (
                            <BeatLoader color={'#000'} loading={loading} size={5} />
                        ) : (
                            <span className='flex gap-x-2'>
                                <i className="fa-regular fa-circle-check"></i>
                                <span className='mr-1'>ثبت</span>
                            </span>
                        )}
                    </button>
                </div>

            </div>
        </motion.div>
    );
}

export default CreateAccWin;