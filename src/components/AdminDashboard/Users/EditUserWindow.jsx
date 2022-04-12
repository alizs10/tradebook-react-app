import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditUser } from '../../Redux/Action/Admin/Users';
import { notify } from '../../Services/alerts';
import { UpdateUser } from '../../Services/Admin/UsersServices';
import { userValidation } from '../../Services/Admin/adminValidation';

const EditUserWindow = ({ setDoUserNeedEditUserWindow, user }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [isAdmin, setIsAdmin] = useState("")
    const [errors, setErrors] = useState({})


    useEffect(() => {
        if (isEmpty(user)) return

        setName(user.name)
        setEmail(user.email)
        setMobile(user.mobile)
        setIsAdmin(`${user.is_admin}`)
    }, [user])

    const dispatch = useDispatch()

    const handleEditUser = async () => {

        let editedUser = {
            id: user.id, name, email, mobile, is_admin: isAdmin, _method: "PUT"
        }
        const { success, errors } = userValidation(editedUser);

        if (success) {
            setErrors({})
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
            setErrors(errors)
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
                        }} id="name" />
                        {errors.name && (<span className='text-xxs text-red-400'>{errors.name}</span>)}


                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">ایمیل:</label>
                        <input type="text" className="form-input" value={email} onChange={event => {
                            setEmail(event.target.value);
                        }} id="email" />
                        {errors.email && (<span className='text-xxs text-red-400'>{errors.email}</span>)}


                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">شماره موبایل:</label>
                        <input type="text" className="form-input" value={mobile} onChange={event => {
                            setMobile(event.target.value);
                        }} id="mobile" />
                        {errors.mobile && (<span className='text-xxs text-red-400'>{errors.mobile}</span>)}


                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="isAdmin">نقش</label>
                        <select className='form-input' id="isAdmin" value={isAdmin} onChange={event => {
                            setIsAdmin(event.target.value);
                        }}>
                            <option value="0">کاربر عادی</option>
                            <option value="1" >ادمین</option>
                        </select>
                        {errors.is_admin && (<span className='text-xxs text-red-400'>{errors.is_admin}</span>)}

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