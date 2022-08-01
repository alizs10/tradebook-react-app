import React, { Fragment, useEffect, useState } from 'react';
import useCountDown from 'react-countdown-hook';
import { BeatLoader } from 'react-spinners';
import { notify } from '../Services/alerts';
import { forgotPassowrd, resetPassowrd } from '../Services/UserServices';
import { resetPasswordProfileValidation } from '../Services/validation';

import { motion } from 'framer-motion';
import { isEmpty } from 'lodash';

const ResetPasswordWindow = ({ setDoUserNeedResetPasswordWindow }) => {

    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [newPassConfirm, setNewPassConfirm] = useState("")
    const [errors, setErrors] = useState({})

    const [isCodeSending, setIsCodeSending] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isNewPassSent, setIsNewPassSent] = useState(false)

    const initialTime = 120000; // initial time in milliseconds, defaults to 60000
    const interval = 1000; // interval to change remaining time amount, defaults to 1000
    const [timeLeft, { start, reset }] = useCountDown(initialTime, interval);

    useEffect(() => {
        if (timeLeft === 0)
            setIsNewPassSent(false)
    }, [timeLeft])



    const handleResetPassword = async () => {

        if (isCodeSending) {
            notify('سیستم در حال انجام درخواست شما می باشد، صبر کنید', 'warning')
            return
        }

        if (loading) {
            notify('سیستم در حال انجام درخواست شما می باشد، صبر کنید', 'warning')
            return
        }

        setLoading(true)

        let passArray = {
            old_password: oldPass, password: newPass, password_confirmation: newPassConfirm
        }

        const { success, errors } = resetPasswordProfileValidation(passArray);

        if (success) {
            setErrors({})

            try {
                const { data, status } = await resetPassowrd(passArray)

                if (status === 200) {
                    if (data.status) {
                        reset();
                        setDoUserNeedResetPasswordWindow(false)
                        notify("کلمه عبور شما با موفقیت تغییر کرد", "success")
                        
                    } else if (status === 422) {
                        data.errors.forEach(error => {
                            notify(error, "warning")
                        });
                    } else {
                        notify("کلمه عبور پیشین شما صحیح نمی باشد", "error")
                        
                    }
                } else {
                    notify("مشکلی پیش آمده است", "warning")
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

    const handleForgotPassword = async (e) => {

        if (isNewPassSent) {
            e.preventDefault();
            notify('کلمه عبور جدید به ایمیل شما ارسال شده است، دو دقیقه صبر کنید', 'warning')
            return
        }
        if (isCodeSending) {
            e.preventDefault();
            notify('سیستم در حال انجام درخواست شما می باشد، صبر کنید', 'warning')
            return
        }

        setIsCodeSending(true)
        try {
            const { status, data } = await forgotPassowrd()

            if (status === 200) {
                if (data.status) {
                    setIsCodeSending(false)
                    setIsNewPassSent(true);
                    start()
                    notify("کلمه عبور جدید به ایمیل شما ارسال شد", "success")
                    
                } else {
                    setIsCodeSending(false)
                    notify("خطایی رخ داده است، دوباره امتحان کنید", "error")
                    
                }
            }
        } catch (e) {
            let error = Object.assign({}, e)
            setIsCodeSending(false)
            if (error.response.status === 429) {
                notify('در هر دودقیقه، یک بار مجاز به ارسال درخواست هستید', 'warning')
            }


        }
    }

    return (


        <motion.div key="modal"
            initial={{ opacity: 0 }} animate={{ y: 25, x: "-50%", opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-0 left-1/2 w-4/5 transform -translate-x-1/2 mt-4 z-50 rounded-lg drop-shadow-lg bg-slate-600">
            <div className="w-full text-slate-100 p-2 flex flex-col gap-y-2">

                <div className="flex justify-between items-center pb-2 border-b-2 border-slate-400">
                    <h2 className="text-base">تغییر کلمه عبور</h2>

                    <button className="p-2 text-base" onClick={() => setDoUserNeedResetPasswordWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label htmlFor="old-password">کلمه عبور فعلی</label>
                        <input type="password" className="form-input" value={oldPass} onChange={event => {
                            setOldPass(event.target.value)
                        }} id='old-password' />
                        {errors.old_password && (<span className='text-xxs text-red-400'>{errors.old_password}</span>)}
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label htmlFor="new-password">کلمه عبور جدید</label>
                        <input type="password" className="form-input" value={newPass} onChange={event => {
                            setNewPass(event.target.value)
                        }} id='new-password' />
                        {errors.password && (<span className='text-xxs text-red-400'>{errors.password}</span>)}
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label htmlFor="new-password-confirm">تکرار کلمه عبور جدید</label>
                        <input type="password" className="form-input" value={newPassConfirm} onChange={event => {
                            setNewPassConfirm(event.target.value)
                        }} id='new-password-confirm' />
                        {errors.password_confirmation && (<span className='text-xxs text-red-400'>{errors.password_confirmation}</span>)}
                    </div>

                </div>

                <div className="mt-4 flex justify-end gap-x-2">
                    <button className="px-4 py-2 rounded-lg text-sm bg-gray-300 text-slate-900" onClick={(e) => handleForgotPassword(e)}>
                        {isNewPassSent ? (timeLeft / 1000) : (

                            isCodeSending ? (
                                <BeatLoader color={'#000'} isCodeSending={isCodeSending} size={5} />
                            ) : (
                                <span>
                                    <i className="fa-regular fa-lock"></i>
                                    <span className="mr-1">فراموشی کلمه عبور</span>
                                </span>
                            )

                        )}
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm bg-yellow-300 text-slate-900" onClick={() => handleResetPassword()}>
                        {loading ? (
                            <BeatLoader color={'#000'} loading={loading} size={5} />
                        ) : (
                            <span className='flex gap-x-2'>
                                <i className="fa-regular fa-edit"></i>
                                <span className="mr-1">ویرایش</span>
                            </span>
                        )}
                    </button>

                </div>

            </div>
        </motion.div>

    );
}

export default ResetPasswordWindow;