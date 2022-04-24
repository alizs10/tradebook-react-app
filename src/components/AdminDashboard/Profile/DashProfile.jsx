import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResetPasswordWindow from '../../Panel/ResetPasswordWindow';
import { AddUser } from '../../Redux/Action/User';
import { notify } from '../../Services/alerts';
import { UpdateProfile } from '../../Services/UserServices';
import { profileValidation } from '../../Services/validation';
import EditProfileWindow from './EditProfileWindow';
import Helmet from 'react-helmet';

const DashProfile = () => {

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [avatar, setAvatar] = useState("");
    const [profile_photo_path, setProfilePath] = useState("");
    const [userVerification, setUserVerification] = useState("");
    const [errors, setErrors] = useState({})

    const [doUserNeedResetPasswordWindow, setDoUserNeedResetPasswordWindow] = useState(false);
    const [doUserNeedEditProfileWindow, setDoUserNeedEditProfileWindow] = useState(false);

    const blurConditions = doUserNeedResetPasswordWindow || doUserNeedEditProfileWindow;
    const handleCloseOpenWindow = () => {
        if (doUserNeedResetPasswordWindow) {
            setDoUserNeedResetPasswordWindow(false)
        } else {
            setDoUserNeedEditProfileWindow(false)
        }
    }
    const dispatch = useDispatch();
    const user = useSelector(state => state.User)

    useEffect(() => {
        if (isEmpty(user)) return;

        console.log(user);
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
        console.log(success);

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
            <section className="mt-4 mx-2">

                <div className="flex justify-between items-center">
                    <h2 className="text-base pb-1 text-gray-600">پروفایل</h2>
                </div>


                <section className="py-2 mt-2 bg-white dark:bg-slate-800  shadow-md rounded-xl">
                    <div className="flex justify-between mx-2">

                        <div className="flex flex-col gap-y-4">
                            <div className="flex flex-col gap-y-1">
                                <span className="text-xs font-light dark:text-slate-500 dark:text-slate-200">نام و نام خانوداگی:</span>
                                <span className="text-sm font-semibold dark:text-slate-300">{user.name}</span>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <span className="text-xs font-light dark:text-slate-500 dark:text-slate-200">ایمیل:</span>
                                <span className="text-sm font-semibold dark:text-slate-300">{user.email}</span>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <span className="text-xs font-light dark:text-slate-500 dark:text-slate-200">شماره موبایل:</span>
                                <span className="text-sm font-semibold dark:text-slate-300">{user.mobile}</span>
                            </div>

                        </div>

                        {user.profile_photo_path && (<img src={`http://localhost:8000/${user.profile_photo_path}`} alt="avatar" className="rounded-full w-36 h-36" />)}
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
            </section>

            {doUserNeedResetPasswordWindow && (<ResetPasswordWindow setDoUserNeedResetPasswordWindow={setDoUserNeedResetPasswordWindow} />)}
            {doUserNeedEditProfileWindow && (<EditProfileWindow errors={errors} name={name} email={email} mobile={mobile} setName={setName} setEmail={setEmail} setMobile={setMobile} setProfilePath={setProfilePath} handleUpdateProfile={handleUpdateProfile} setDoUserNeedEditProfileWindow={setDoUserNeedEditProfileWindow} />)}
            {blurConditions && (<div className="fixed top-16 left-0 w-full h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => handleCloseOpenWindow()}></div>)}
        </Fragment>
    );
}

export default DashProfile;