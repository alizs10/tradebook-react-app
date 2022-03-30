import React, { Fragment, useEffect, useState } from 'react';
import useCountDown from 'react-countdown-hook';
import { useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { AddUser } from '../Redux/Action/User';
import { notify } from '../Services/alerts';
import { CheckVerificationCode, SendVerificationCode } from '../Services/UserServices';

const EmailVerificationWindow = ({ userId, setDoUserNeedActivationWindow }) => {

    const [code, setCode] = useState(false)
    const [isVCodeSent, setIsVCodeSent] = useState(false)
    const [loading, setLoading] = useState(false)


    const initialTime = 120000; // initial time in milliseconds, defaults to 60000
    const interval = 1000; // interval to change remaining time amount, defaults to 1000
    const [timeLeft, { start, reset }] = useCountDown(initialTime, interval);

    useEffect(() => {
        if (timeLeft === 0)
            setIsVCodeSent(false)
    }, [timeLeft])

    const dispatch = useDispatch()

    const handleSendVerificationCode = async (e) => {
        if (isVCodeSent) {
            e.preventDefault();
            notify('کد به ایمیل شما ارسال شده است، دو دقیقه صبر کنید', 'warning')
            return
        }
        if (loading) {
            e.preventDefault();
            notify('سیستم در حال انجام درخواست شما می باشد، صبر کنید', 'warning')
            return
        }
        setLoading(true)

        try {
            const { status } = await SendVerificationCode()
            if (status === 200) {
                setLoading(false)
                setIsVCodeSent(true);
                notify('کد فعالسازی به ایمیل شما ارسال شد', 'success')
                start();
                return
            } else {
                setLoading(false)
            }
        } catch (e) {
            let error = Object.assign({}, e)

            if (error.response.status === 429) {
                setLoading(false)
                notify('در هر دودقیقه، یک بار مجاز به ارسال درخواست هستید', 'warning')
            }
            
        }


    }

    const handleActivation = async () => {
        if (!code) {
            notify('لطفا کد را وارد کنید', 'warning')
            return
        };

        try {
            var vCode = { verification_code: code };
            const { data, status } = await CheckVerificationCode(vCode, userId);

            if (status === 200) {
                localStorage.setItem('token', data.new_token)
                dispatch(AddUser(data.user))
                reset();
                setDoUserNeedActivationWindow(false)
                notify('حساب کاربری شما با موفقیت فعال شد', 'success')
            }
        } catch (e) {
            var error = Object.assign({}, e);
            if (error.response.status === 422) {
                notify('کد وارد شده صحیح نمی باشد', 'warning')
            } else {
                notify('خطای سرور', 'error')
            }
        }
    }


    return (
        <Fragment>
            <section
                className="absolute top-0 left-1/2 w-4/5 transform -translate-x-1/2 mt-4 z-50 rounded-lg drop-shadow-lg bg-slate-600">
                <div className="w-full text-slate-100 p-2 flex flex-col gap-y-2">

                    <div className="flex justify-between items-center pb-2 border-b-2 border-slate-400">
                        <h2 className="text-base">فعالسازی ایمیل</h2>

                        <button className="p-2 text-base" onClick={() => setDoUserNeedActivationWindow(false)}>
                            <i className="fa-regular fa-xmark"></i>
                        </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2">
                        <div className="clo-span-1 flex flex-col gap-y-1">
                            <label htmlFor="">کد تایید</label>
                            <input type="text" className="form-input" onChange={(e) => setCode(e.target.value)} />
                        </div>


                    </div>

                    <div className="mt-4 flex justify-end gap-x-2">
                        <button className="px-4 py-2 h-fit rounded-lg text-sm bg-blue-600 text-white" onClick={(e) => handleSendVerificationCode(e)}>
                            {isVCodeSent ? (timeLeft / 1000) : (

                                loading ? (
                                    <BeatLoader color={'#fff'} loading={loading} size={5} />
                                ) : (
                                    <span>
                                        <i className="fa-regular fa-clock text-lg"></i>
                                        <span className="mr-1">ارسال کد</span>
                                    </span>
                                )


                            )}
                        </button>
                        <button className="px-4 py-2 h-fit rounded-lg text-sm bg-emerald-400 text-black" onClick={(e) => handleActivation(e)}>
                            <i className="fa-regular fa-check-circle text-lg"></i>
                            <span className="mr-1">فعالسازی ایمیل</span>
                        </button>
                    </div>

                </div>
            </section>
        </Fragment>
    );
}

export default EmailVerificationWindow;