import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { AddUser } from '../Redux/Action/User';
import { notify } from '../Services/alerts';
import { UpdateProfile } from '../Services/UserServices';
import { profileValidation } from '../Services/validation';
import EditProfileWindow from './EditProfileWindow';
import EmailVerificationWindow from './EmailVerificationWindow';
import ResetPasswordWindow from './ResetPasswordWindow';

const PanelProfile = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.User);

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [avatar, setAvatar] = useState("");
    const [profile_photo_path, setProfilePath] = useState("");
    const [userVerification, setUserVerification] = useState("");
    const [errors, setErrors] = useState({})


    const [doUserNeedActivationWindow, setDoUserNeedActivationWindow] = useState(false);
    const [doUserNeedResetPasswordWindow, setDoUserNeedResetPasswordWindow] = useState(false);
    const [doUserNeedEditProfileWindow, setDoUserNeedEditProfileWindow] = useState(false);

    const blurConditions = doUserNeedActivationWindow || doUserNeedResetPasswordWindow || doUserNeedEditProfileWindow;
    const handleCloseOpenWindow = () => {
        if (doUserNeedActivationWindow) {
            setDoUserNeedActivationWindow(false)
        } else if (doUserNeedResetPasswordWindow) {
            setDoUserNeedResetPasswordWindow(false)
        } else {
            setDoUserNeedEditProfileWindow(false)
        }
    }


    useEffect(() => {
        if (isEmpty(user)) return;

        setUserId(user.id)
        setName(user.name)
        setEmail(user.email)
        setMobile(user.mobile)
        setAvatar(user.profile_photo_path)
        setUserVerification(user.email_verified_at)
    }, [user])

    const handleUpdateProfile = async () => {
        
        var formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('profile_photo_path', profile_photo_path);
        formData.append('_method', "PUT");
        const { success, errors } = profileValidation(formData);
        
        if (success) {
            setErrors({})
            try {
                const { data, status } = await UpdateProfile(formData);

                if (status === 200) {
                    dispatch(AddUser(data.user))
                    setDoUserNeedEditProfileWindow(false)
                    notify('پروفایل کاربری شما با موفقیت بروزرسانی شد', 'success')
                }
            } catch (e) {

                var error = Object.assign({}, e);
                if (error.response.status === 422) {
                    notify('اطلاعات وارد شده صحیح نمی باشد', 'warning')
                } else {
                    notify('خطای سرور', 'error')
                }
            }
        } else {
            setErrors(errors)
        }
    }


    return (
        <Fragment>

            <Helmet>
                <title>پروفایل کاربری - تریدبوک</title>
            </Helmet>


            <div className="mr-2 mt-4">
                <h2 className="text-slate-300 text-lg">مشخصات کاربر
                    ({isEmpty(userVerification) ? (
                        <span className='text-danger'>غیرفعال</span>
                    ) : (
                        <span className='text-success'>فعال</span>
                    )})
                </h2>
            </div>


            <section className="mt-4 flex flex-col gap-y-4">
                <div className="flex justify-between mx-2">

                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-1">
                            <span className="text-xs font-light text-slate-400">نام و نام خانوداگی:</span>
                            <span className="text-sm font-semibold dark:text-slate-300">{name}</span>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className="text-xs font-light text-slate-400">ایمیل:</span>
                            <span className="text-sm font-semibold dark:text-slate-300">{email}</span>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className="text-xs font-light text-slate-400">شماره موبایل:</span>
                            <span className="text-sm font-semibold dark:text-slate-300">{mobile}</span>
                        </div>
                        <span className="text-base text-slate-300">کد معرف شما: <span
                            className="text-emerald-400 font-bold">{user.referral_code}</span></span>
                    </div>
                    {!avatar ? null : (<img src={`http://localhost:8000/${avatar}`} alt="avatar" className="rounded-full w-36 h-36" />)}



                </div>

                <div className="flex gap-x-2 mt-4 mr-2">
                    <button className="px-4 py-2 rounded-lg text-xs bg-yellow-200 flex items-center" onClick={() => setDoUserNeedEditProfileWindow(true)}>
                        <i className="fa-light fa-pen-to-square text-xs lg:text-base ml-2"></i>
                        ویرایش پروفایل</button>
                    <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => setDoUserNeedResetPasswordWindow(true)}>
                        <i className="fa-light fa-key-skeleton text-xs lg:text-base ml-2"></i>
                        تغییر کلمه عبور</button>
                </div>


            </section>


            <div className="flex flex-col gap-y-4 mx-2 mt-4">

                <h2 className="text-slate-300 text-lg">پیغام های سیستم</h2>
                {user.referral.code_status === 0 && (
                    <div className="bg-blue-300 rounded-lg drop-shadow-lg p-2 flex flex-col gap-y-2">
                        <p className="font-semibold text-black text-base">
                            از دوستان خود بخواهید با کد معرف شما ثبت نام کنند تا اشتراک 30 روزه هدیه بگیرید
                        </p>
                    </div>
                )}
                {!isEmpty(userVerification) ? (null) : (
                    <div className='flex flex-col gap-y-1'>
                        <div className="bg-yellow-500 rounded-lg drop-shadow-lg p-2 flex flex-col gap-y-2">
                            <p className="font-semibold text-black text-base">
                                <span className="font-bold">توجه:</span>
                                برای استفاده از اپلیکیشن تریدبوک، ابتدا باید حساب کاربری خود را فعال کنید
                            </p>
                        </div>

                        <button className="px-4 py-2 rounded-lg w-fit text-xs bg-emerald-400 flex items-center" onClick={() => setDoUserNeedActivationWindow(true)}>
                            <i className="fa-light fa-badge-check text-xs lg:text-base ml-2"></i>
                            فعالسازی حساب</button>
                    </div>
                )}
            </div>


            {!doUserNeedResetPasswordWindow ? null : (<ResetPasswordWindow setDoUserNeedResetPasswordWindow={setDoUserNeedResetPasswordWindow} />)}
            {!doUserNeedActivationWindow ? null : (<EmailVerificationWindow userId={userId} setDoUserNeedActivationWindow={setDoUserNeedActivationWindow} />)}
            {!doUserNeedEditProfileWindow ? null : (<EditProfileWindow errors={errors} name={name} email={email} mobile={mobile} setName={setName} setEmail={setEmail} setMobile={setMobile} setProfilePath={setProfilePath} handleUpdateProfile={handleUpdateProfile} setDoUserNeedEditProfileWindow={setDoUserNeedEditProfileWindow} />)}
            {!blurConditions ? null : (<div className="fixed top-0 left-0 w-3/4 h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => handleCloseOpenWindow()}></div>)}

        </Fragment>
    );
}

export default PanelProfile;