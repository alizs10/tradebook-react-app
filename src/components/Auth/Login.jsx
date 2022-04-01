import React, { Fragment, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import SimpleReactValidator from 'simple-react-validator';
import { AddUser } from '../Redux/Action/User';
import { notify } from '../Services/alerts';
import { loginUser } from '../Services/AuthService';

const Login = () => {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [, forceUpdate] = useState()


    const dispatch = useDispatch();
    const navigate = useNavigate();;



    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی می باشد",
            email: "باید ایمیل بصورت صحیح وارد شود",
            min: "باید حداقل 8 کارکتر باشد",
        },
        element: message => <span className='text-xs text-red-400'>{message}</span>
    }));

    const handelLogin = async event => {
        event.preventDefault();
        if (loading) {
            notify('سیستم در حال انجام درخواست شما می باشد، صبر کنید', 'warning')
            return
        }
        setLoading(true)
        const user = {
            email, password
        }

        if (validator.current.allValid()) {
            try {
                const { data, status } = await loginUser(user);

                if (status === 200) {
                    reset()
                    localStorage.setItem('token', data.token)
                    dispatch(AddUser(data.user))
                    navigate("/panel/")
                    notify('با موفقیت وارد شدید', 'success')
                } else if (status === 401) {
                    notify('ایمیل یا کلمه عبور شما اشتباه می باشد', 'danger')
                } else {
                    notify('مشکلی رخ داده است', 'danger')
                }
            } catch (e) {
                var error = Object.assign({}, e);
                if (error.response.status === 401) {
                    notify('ایمیل یا کلمه عبور شما اشتباه می باشد', 'error')
                } else {
                    notify('مشکلی رخ داده است', 'error')
                }
            }

            setLoading(false)

        } else {
            setLoading(false)
            validator.current.showMessages();
            forceUpdate(1);
        }


    }

    const reset = () => {
        setEmail("")
        setPassword("")
    }

    return (

        <Fragment>
            <Helmet>
                <title>به تریدبوک خوش آمدید</title>
            </Helmet>

            <form onSubmit={handelLogin}>
                <div className="rounded-lg p-2 backdrop-blur-sm bg-white/10 flex flex-col gap-y-2">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="text-xs">ایمیل</label>
                        <input type="email" className="form-input" value={email} onChange={event => {
                            setEmail(event.target.value);
                            validator.current.showMessageFor('email')
                        }} id="email" />
                        {validator.current.message("email", email, "required|email")}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="text-xs">کلمه عبور</label>
                        <input type="password" className="form-input" value={password} onChange={event => {
                            setPassword(event.target.value);
                            validator.current.showMessageFor('password')
                        }} id="password" />
                        {validator.current.message("password", password, "required|min:8")}
                    </div>

                    <button className="py-3 mt-4 text-black text-base bg-emerald-400 rounded-lg">
                        {loading ? (
                            <BeatLoader color={'#000'} loading={loading} size={5}  />
                        ) : "ورود"}
                    </button>
                    <Link to="/forgot-password" className="text-slate-400 text-xs mt-2">فراموشی کلمه عبور؟</Link>

                </div>
            </form>


        </Fragment>


    );
}

export default Login;