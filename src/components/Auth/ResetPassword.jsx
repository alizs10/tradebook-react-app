import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { BeatLoader } from 'react-spinners';
import { notify } from '../Services/alerts';
import { resetPassword } from '../Services/AuthService'

const ResetPassword = () => {

    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const { token, email } = useParams();
    const navigate = useNavigate()


    const handleResetPassword = async () => {
        setLoading(true)

        if (loading) return

     
            let passResetObj = {
                email, password, password_confirmation: passwordConfirmation, token
            }

            try {
                
                const { data, status } = await resetPassword(passResetObj)

                if (status === 200) {
                    if (data.status) {
                        setLoading(false)
                        setPassword("")
                        setPasswordConfirmation("")
                        navigate("/")
                        notify("کلمه عبور شما با موفقیت تغییر کرد", "success")
                    } else {
                        setLoading(false)
                        notify("لینک نامعتبر می باشد", "error")

                    }
                }
                
                
            } catch (e) {
                setLoading(false)
                var error = Object.assign({}, e);
                notify(error.response.data.message, "error")
            }
       

    }


    return (
        <div className="rounded-lg p-2 backdrop-blur-sm bg-white/10 flex flex-col gap-y-2">

            <div className="flex flex-col gap-y-2">
                <label htmlFor="password" className="text-xs">کلمه عبور جدید</label>
                <input type="password" id="password" className="form-input" value={password} onChange={event => {
                    setPassword(event.target.value);
                }} />
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="password_confirmation" className="text-xs">تکرار کلمه عبور جدید</label>
                <input type="password" id="password_confirmation" className="form-input" value={passwordConfirmation} onChange={event => {
                    setPasswordConfirmation(event.target.value);
                }} />
            </div>

            <button className="py-3 mt-4 text-black text-base bg-emerald-400 rounded-lg" onClick={() => handleResetPassword()}>
            {loading ? (
                <BeatLoader color={'#ffffff'} loading={loading} size={5} />
            ) : "تایید"}
            </button>

        </div>

    );
}

export default ResetPassword;