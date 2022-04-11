import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllAccounts } from '../Redux/Action/Accounts';
import { EditAcc } from '../Services/AccSevices';
import { notify } from '../Services/alerts';
import { accValidation } from '../Services/validation';

const EditAccWin = ({ acc, setDoUserWantEditAccWin }) => {

    const [accName, setAccName] = useState(acc.name);
    const [accType, setAccType] = useState(`${acc.type}`);
    const [accBalance, setAccBalance] = useState(acc.balance);
    const [accCreatedDate, setAccCreatedDate] = useState(acc.account_created_at);
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isEmpty(acc)) {
            setAccName(acc.name)
            setAccType(`${acc.type}`)
            setAccBalance(acc.balance)
            setAccCreatedDate(moment(acc.account_created_at).format("YYYY-MM-DD"))
        }
    }, [acc])

    const handleEditAcc = async () => {
        const edited_acc = { ...acc, name: accName, balance: accBalance, type: accType, account_created_at: accCreatedDate, _method: "put" };
        console.log(edited_acc);
        const { success, errors } = accValidation(edited_acc);
        if (success) {
            setErrors({})
            try {
                const { status } = await EditAcc(edited_acc);

                if (status === 200) {
                    dispatch(getAllAccounts());
                    setDoUserWantEditAccWin(false);
                    notify('حساب شما با موفقیت ویرایش شد', 'success')

                } else {
                    notify('مشکلی پیش آمده است، دوباره امتحان کنید', 'error')
                }
            } catch (e) {
                var error = Object.assign({}, e);

            }

        } else {
            setErrors(errors)
        }
    }

    return (

        <section
            className="absolute top-0 left-1/2 w-4/5 transform -translate-x-1/2 mt-4 z-50 rounded-lg drop-shadow-lg bg-slate-600" >
            <div className="w-full text-slate-100 p-2 flex flex-col gap-y-2">

                <div className="flex justify-between items-center pb-2 border-b-2 border-slate-400">
                    <h2 className="text-base">ویرایش اطلاعات حساب</h2>

                    <button className="p-2 text-base" onClick={() => setDoUserWantEditAccWin(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label htmlFor="name">نام حساب</label>
                        <input type="text" className="form-input" id="name" value={accName} onChange={(event) => setAccName(event.target.value)} />
                        {errors.name && (<span className='text-xxs text-red-400'>{errors.name}</span>)}
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label htmlFor="balance">بالانس اولیه ی حساب</label>
                        <input type="text" className="form-input" id="balance" value={accBalance} onChange={(event) => setAccBalance(event.target.value)} />
                        {errors.balance && (<span className='text-xxs text-red-400'>{errors.balance}</span>)}
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label htmlFor="acc_created_date">تاریخ ساخت حساب</label>
                        <input type="date" className="form-input" id="acc_created_date" value={accCreatedDate} onChange={(event) => setAccCreatedDate(event.target.value)} />
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

                    <button className="px-4 py-2 rounded-lg text-base bg-yellow-300 text-slate-900 flex justify-center items-center" onClick={() => handleEditAcc()}>
                        <i className="fa-regular fa-edit"></i>
                        <span className='mr-1'>ویرایش</span>
                    </button>
                </div>

            </div>
        </section>

    );
}

export default EditAccWin;