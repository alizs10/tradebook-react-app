import React, { useState } from 'react';
import { notify } from '../Services/alerts';
import { forgotPassword } from '../Services/AuthService';

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [, forceUpdate] = useState()



    const handleForgotPassword = async () => {



        let passForgotObj = { email }

        try {
            const { data, status } = await forgotPassword(passForgotObj)

            if (status === 200) {
                if (data.status) {
                    notify("لینک بازیابی کلمه عبور به ایمیل شما ارسال شد", "success")
                    setEmail("")
                } else {
                    notify("مشکلی رخ داده است، دوباره امتحان کنید", "error")

                }
            }
        } catch (e) {
            var error = Object.assign({}, e);
        }


    }

    return (
        <div className="rounded-lg p-2 backdrop-blur-sm bg-white/10 flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
                <label htmlFor="email" className="text-xs">ایمیل</label>
                <input type="email" id="email" className="form-input" value={email} onChange={event => {
                    setEmail(event.target.value);
                }} />
            </div>

            <button className="py-3 mt-4 text-black text-base bg-emerald-400 rounded-lg" onClick={() => handleForgotPassword()}>ارسال ایمیل</button>

        </div>
    );
}

export default ForgotPassword;