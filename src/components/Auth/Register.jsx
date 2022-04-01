import React, { Fragment, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import { notify } from '../Services/alerts';
import { registerUser } from '../Services/AuthService';

const Register = () => {
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirm, setPasswordConfirm] = useState("");
    const [referralCode, setReferralCode] = useState("");


    const [, forceUpdate] = useState();
    const navigate = useNavigate();



    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی می باشد",
            email: "باید ایمیل بصورت صحیح وارد شود",
            min: "باید حداقل 8 کارکتر باشد",
            size: "باید 11 عدد باشد",
            numeric: "باید عدد باشد",
        },
        element: message => <span className='text-red-400 text-xxs'>{message}</span>
    }));

    const handelRegister = async event => {
        event.preventDefault();
        if (loading) {
            notify('سیستم در حال انجام درخواست شما می باشد، صبر کنید', 'warning')
            return
        }
        setLoading(true)
        const user = {
            name, email, password, password_confirmation: password_confirm, mobile, referral_code: referralCode
        }
        if (validator.current.allValid()) {
            try {


                const { status } = await registerUser(user);

                if (status === 201) {
                    notify('تبریک، عضویت شما با موفقیت انجام شد', 'success')
                    reset();
                    navigate("/", { replace: true })
                }
            }

            catch (error) {
                notify('مشکلی پیش آمده است', 'error')
            }
        } else {
            validator.current.showMessages();
            forceUpdate(1);
        }
        setLoading(false)
    }

    const reset = () => {
        setName("")
        setMobile("")
        setEmail("")
        setPassword("")
        setPasswordConfirm("")
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
                            validator.current.showMessageFor('name')
                        }} id="firstname" />
                        {validator.current.message("name", name, "required|min:5")}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="text-xs">ایمیل</label>
                        <input type="email" className='form-input' value={email} onChange={event => {
                            setEmail(event.target.value)
                            validator.current.showMessageFor('email')
                        }} id="email" />
                        {validator.current.message("email", email, "required|email")}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="text-xs">شماره موبایل</label>
                        <input type="text" className='form-input' value={mobile} onChange={event => {
                            setMobile(event.target.value)
                            validator.current.showMessageFor('mobile')
                        }} id="mobile" />
                        {validator.current.message("mobile", mobile, "required|numeric|size:11")}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="text-xs">کلمه عبور</label>
                        <input type="password" className='form-input' value={password} onChange={event => {
                            setPassword(event.target.value)
                            validator.current.showMessageFor('password')
                        }} id="password" />
                        {validator.current.message("password", password, "required|min:8")}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="password_confirm" className="text-xs">تکرار کلمه عبور</label>
                        <input type="password" className='form-input' value={password_confirm} onChange={event => {
                            setPasswordConfirm(event.target.value)
                            validator.current.showMessageFor('password_confirm')
                        }} id="password_confirm" />
                        {validator.current.message("password_confirm", password_confirm, "required|min:8")}
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="referral_code" className="text-xs">کد معرف دارید؟</label>
                        <input type="text" className="form-input" value={referralCode} onChange={event => {
                            setReferralCode(event.target.value)
                            validator.current.showMessageFor('referral_code')
                        }} id="referral_code" />
                        {validator.current.message("referral_code", referralCode, "size:6")}

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