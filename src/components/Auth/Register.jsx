import { isEmpty } from 'lodash';
import React, { Fragment, useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { BeatLoader } from 'react-spinners';
import { notify } from '../Services/alerts';
import { registerUser } from '../Services/AuthService';
import { signupValidation } from '../Services/validation';
import { AuthData } from './AuthContext';

const Register = () => {
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password_confirm, setPasswordConfirm] = useState("");
    const [referralCode, setReferralCode] = useState("");


    const [errors, setErrors] = useState({})
    const navigate = useNavigate();


    const authData = useContext(AuthData);


    const handelRegister = async event => {
        event.preventDefault();
        if (loading) {
            notify('سیستم در حال انجام درخواست شما می باشد، صبر کنید', 'warning')
            return
        }
        setLoading(true)
        const user = {
            name, email: authData.email, password: authData.password, password_confirmation: password_confirm, mobile, referral_code: referralCode
        }
        const { success, errors } = signupValidation(user);

        if (success) {
            setErrors({})

            try {
                const { status } = await registerUser(user);

                if (status === 201) {
                    navigate("/")
                    notify('تبریک، عضویت شما با موفقیت انجام شد', 'success')
                    return;
                }
            }

            catch (e) {
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

        <Fragment>

            <Helmet>
                <title>تریدبوک - ثبت نام</title>
            </Helmet>

            <form onSubmit={handelRegister}>

                <div className="rounded-lg p-2 backdrop-blur-sm bg-white/10 flex flex-col gap-y-2">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="text-xs">نام و نام خانوادگی</label>
                        <input type="text" className='form-input' value={name} onChange={event => {
                            setName(event.target.value)

                        }} id="name" />
                        {errors.name && (<span className='text-xxs text-red-400'>{errors.name}</span>)}

                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="text-xs">ایمیل</label>
                        <input type="email" className='form-input' value={authData.email} onChange={event => {
                            authData.setEmail(event.target.value)

                        }} id="email" />
                        {errors.email && (<span className='text-xxs text-red-400'>{errors.email}</span>)}

                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="text-xs">شماره موبایل</label>
                        <input type="text" className='form-input' value={mobile} onChange={event => {
                            setMobile(event.target.value)
                        }} id="mobile" />
                        {errors.mobile && (<span className='text-xxs text-red-400'>{errors.mobile}</span>)}

                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="text-xs">کلمه عبور</label>
                        <input type="password" className='form-input' value={authData.password} onChange={event => {
                            authData.setPassword(event.target.value)

                        }} id="password" />
                        {errors.password && (<span className='text-xxs text-red-400'>{errors.password}</span>)}

                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="password_confirm" className="text-xs">تکرار کلمه عبور</label>
                        <input type="password" className='form-input' value={password_confirm} onChange={event => {
                            setPasswordConfirm(event.target.value)

                        }} id="password_confirm" />
                        {errors.password_confirm && (<span className='text-xxs text-red-400'>{errors.password_confirm}</span>)}

                    </div>

                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="referral_code" className="text-xs">کد معرف دارید؟</label>
                        <input type="text" className="form-input" value={referralCode} onChange={event => setReferralCode(event.target.value)} id="referral_code" />
                        {errors.referral_code && (<span className='text-xxs text-red-400'>{errors.referral_code}</span>)}


                    </div>

                    <button className="py-3 mt-4 text-black text-base bg-emerald-400 rounded-lg">
                        {loading ? (
                            <BeatLoader color={'#000'} loading={loading} size={5} />
                        ) : "ثبت نام"}
                    </button>
                </div>
            </form>
        </Fragment>


    );
}

export default Register;