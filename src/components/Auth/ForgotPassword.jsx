import React, { useRef, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { notify } from '../Services/alerts';
import { forgotPassword } from '../Services/AuthService';

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [, forceUpdate] = useState()

    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی می باشد",
            email: "باید ایمیل بصورت صحیح وارد شود",
            min: "باید حداقل 8 کارکتر باشد",
        },
        element: message => <span className='text-xs text-red-400'>{message}</span>
    }));

    const handleForgotPassword = async () => {

        if (validator.current.allValid()) {

            let passForgotObj = { email }

            try {
                const {data, status} = await forgotPassword(passForgotObj)

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
                
                console.log(error);
            }
        } else {
            validator.current.showMessages();
            forceUpdate(1);
        }

    }

    return (
        <div className="rounded-lg p-2 backdrop-blur-sm bg-white/10 flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
                <label htmlFor="email" className="text-xs">ایمیل</label>
                <input type="email" id="email" className="form-input" value={email} onChange={event => {
                    setEmail(event.target.value);
                    validator.current.showMessageFor('email')
                }} />
                {validator.current.message("email", email, "required|email")}
            </div>

            <button className="py-3 mt-4 text-black text-base bg-emerald-400 rounded-lg" onClick={() => handleForgotPassword()}>ارسال ایمیل</button>

        </div>
    );
}

export default ForgotPassword;