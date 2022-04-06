import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { EditUser } from '../../Redux/Action/Admin/Users';
import { notify } from '../../Services/alerts';
import { UpdateUser } from '../../Services/Admin/UsersServices';

const EditUserWindow = ({ setDoUserNeedEditUserWindow, user }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [isAdmin, setIsAdmin] = useState("")
    const [, forceUpdate] = useState("");
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی می باشد",
            numeric: "باید عدد وارد کنید"
        },
        element: message => <span className='text-xs text-red-400'>{message}</span>
    }));

    useEffect(() => {
        if (isEmpty(user)) return

        setName(user.name)
        setEmail(user.email)
        setMobile(user.mobile)
        setIsAdmin(`${user.is_admin}`)
    }, [user])

    const dispatch = useDispatch()

    const handleEditUser = async () => {
        if (validator.current.allValid()) {
            let editedUser = {
                id: user.id, name, email, mobile, is_admin: isAdmin, _method: "PUT"
            }

            try {
                const { data, status } = await UpdateUser(editedUser);

                if (status === 200) {
                    console.log(data.user);
                    dispatch(EditUser(data.user))
                    setDoUserNeedEditUserWindow(false)
                    notify('کاربر موردنظر با موفقیت ویرایش شد', 'success')
                }
            }

            catch (error) {
                notify('مشکلی پیش آمده است', 'error')
            }

        } else {
            validator.current.showMessages();
            forceUpdate(1);
        }
    }

    return (
        <section className="absolute top-4 z-40 p-2 w-full">

            <div
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900 dark:text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">جزییات کاربر</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedEditUserWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="p-2 flex flex-col gap-y-1">

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">نام کاربر:</label>
                        <input type="text" className="form-input" value={name} onChange={event => {
                            setName(event.target.value);
                            validator.current.showMessageFor('name')
                        }} id="name" />
                        {validator.current.message("name", name, "required|string")}

                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">ایمیل:</label>
                        <input type="text" className="form-input" value={email} onChange={event => {
                            setEmail(event.target.value);
                            validator.current.showMessageFor('valid_for')
                        }} id="valid_for" />
                        {validator.current.message("valid_for", email, "required|email")}

                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">شماره موبایل:</label>
                        <input type="text" className="form-input" value={mobile} onChange={event => {
                            setMobile(event.target.value);
                            validator.current.showMessageFor('mobile')
                        }} id="mobile" />
                        {validator.current.message("mobile", mobile, "required|numeric|size:11")}

                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="isAdmin">نقش</label>
                        <select className='form-input' id="isAdmin" value={isAdmin} onChange={event => {
                            setIsAdmin(event.target.value);
                            validator.current.showMessageFor('isAdmin')
                        }}>
                            <option value="0">کاربر عادی</option>
                            <option value="1" >ادمین</option>
                        </select>
                        {validator.current.message("isAdmin", isAdmin, "required|in:0,1")}
                    </div>


                </div>


                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => setDoUserNeedEditUserWindow(false)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            انصراف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-yellow-300 flex items-center" onClick={() => handleEditUser()}>
                            <i className="fa-regular fa-check text-xs lg:text-base ml-2"></i>
                            ویرایش</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default EditUserWindow;