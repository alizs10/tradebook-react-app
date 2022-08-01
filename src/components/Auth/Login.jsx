import { isEmpty } from 'lodash';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import { AddUser } from '../Redux/Action/User';
import { notify } from '../Services/alerts';
import { loginUser } from '../Services/AuthService';
import { loginValidation } from '../Services/validation';
import { AuthData } from './AuthContext';

const Login = () => {
    const authData = useContext(AuthData)

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const [unmounted, setUnmounted] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            setUnmounted(true)
        }
    }, [])



    const handelLogin = async event => {
        event.preventDefault();
        if (loading) {
            notify('سیستم در حال انجام درخواست شما می باشد، صبر کنید', 'warning')
            return
        }
        setLoading(true)
        const user = {
            email: authData.email, password: authData.password
        }



        const { success, errors } = loginValidation(user);
        if (success) {
            setErrors({})
            try {
                const { data, status } = await loginUser(user);

                if (status === 200) {
                    !unmounted && reset();
                    localStorage.setItem('token', data.token)
                    dispatch(AddUser(data.user))
                    navigate("/panel/")
                    notify('با موفقیت وارد شدید', 'success')
                } else {
                    notify('مشکلی پیش آمده، دوباره امتحان کنید', 'error')
                }
            } catch (e) {
                var error = Object.assign({}, e);

                if (isEmpty(error.response)) {
                    if (error.isAxiosError) {
                        notify('مشکلی در برقراری ارتباط رخ داده است، از اتصال خود به اینترنت اطمینان حاصل کنید', 'error')
                    }
                } else {
                    if (error.response.status === 401) {
                        notify('ایمیل یا کلمه عبور شما اشتباه می باشد', 'error')
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

    const reset = () => {
        authData.setEmail("")
        authData.setPassword("")
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
                        <input type="email" className="form-input" value={authData.email} onChange={event => authData.setEmail(event.target.value)} id="authData.email" />
                        {errors.email && (<span className='text-xxs text-red-400'>{errors.email}</span>)}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="text-xs">کلمه عبور</label>
                        <input type="password" className="form-input" value={authData.password} onChange={event => authData.setPassword(event.target.value)} id="authData.authData.setPassword" />
                        {errors.password && (<span className='text-xxs text-red-400'>{errors.password}</span>)}

                    </div>

                    <button className="py-3 mt-4 text-black text-base bg-emerald-400 rounded-lg">
                        {loading ? (
                            <BeatLoader color={'#000'} loading={loading} size={5} />
                        ) : "ورود"}
                    </button>
                    <Link to="/forgot-password" className="text-slate-400 text-xs mt-2">فراموشی کلمه عبور؟</Link>

                </div>
            </form>


        </Fragment>


    );
}

export default Login;