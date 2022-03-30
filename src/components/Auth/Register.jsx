import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import { registerUser } from '../Services/AuthService';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirm, setPasswordConfirm] = useState("");


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

        const user = {
            name, email, password, mobile
        }

        try {

            if (validator.current.allValid()) {
                const { status } = await registerUser(user);

                if (status === 201) {
                    toast.success('تبریک، عضویت شما با موفقیت انجام شد', {
                        position: "top-right",
                        closeOnClick: true
                    });
                    reset();
                    navigate("/", { replace: true })
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);
            }

        } catch (error) {
            toast.error('مشکلی پیش آمده است', {
                position: "top-right",
                closeOnClick: true
            });
        }

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
                        <label htmlFor="" className="text-xs">تکرار کلمه عبور</label>
                        <input type="password" className='form-input' value={password_confirm} onChange={event => {
                            setPasswordConfirm(event.target.value)
                            validator.current.showMessageFor('password_confirm')
                        }} id="password_confirm" />
                        {validator.current.message("password_confirm", password_confirm, "required|min:8")}
                    </div>

                    <button className="py-4 mt-4 text-black text-base bg-emerald-400 rounded-lg">ثبت نام</button>
                </div>
            </form>
        </Fragment>


    );
}

export default Register;