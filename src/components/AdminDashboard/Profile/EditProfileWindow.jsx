import React, { Fragment } from 'react';

const EditProfileWindow = ({ errors ,name, email, mobile, handleUpdateProfile, setProfilePath, setName, setMobile, setEmail, setDoUserNeedEditProfileWindow}) => {

    


    return (
        <Fragment>
            <section
                className="absolute top-0 left-1/2 w-4/5 transform -translate-x-1/2 mt-4 z-50 rounded-lg drop-shadow-lg bg-slate-600">
                <div className="w-full text-slate-100 p-2 flex flex-col gap-y-2">

                    <div className="flex justify-between items-center pb-2 border-b-2 border-slate-400">
                        <h2 className="text-base">ویرایش اطلاعات کاربری</h2>

                        <button className="p-2 text-base" onClick={() => setDoUserNeedEditProfileWindow(false)}>
                            <i className="fa-regular fa-xmark"></i>
                        </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="clo-span-1 flex flex-col gap-y-1">
                            <label htmlFor="">نام و نام خانوادگی</label>
                            <input type="text" className="form-input" value={name} onChange={event => setName(event.target.value)} />
                            {errors.name && (<span className='text-xxs text-red-400'>{errors.name}</span>)}

                        </div>
                        <div className="clo-span-1 flex flex-col gap-y-1">
                            <label htmlFor="">ایمیل</label>
                            <input type="email" className="form-input" value={email} onChange={event => setEmail(event.target.value)} />
                            {errors.email && (<span className='text-xxs text-red-400'>{errors.email}</span>)}

                        </div>
                        <div className="clo-span-1 flex flex-col gap-y-1">
                            <label htmlFor="">شماره موبایل</label>
                            <input type="text" className="form-input" value={mobile} onChange={event => setMobile(event.target.value)} />
                            {errors.mobile && (<span className='text-xxs text-red-400'>{errors.mobile}</span>)}

                        </div>
                        <div className="clo-span-1 flex flex-col gap-y-1">
                            <label htmlFor="">آواتار</label>
                            <input type="file" className="form-input" onChange={event => setProfilePath(event.target.files[0])} />
                            {errors.profile_photo_path && (<span className='text-xxs text-red-400'>{errors.profile_photo_path}</span>)}

                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-x-2">
                        <button className="px-4 py-2 rounded-lg text-sm bg-yellow-300 text-slate-900" onClick={() => handleUpdateProfile()}>
                            <i className="fa-regular fa-edit"></i>
                            <span className="mr-1">ویرایش</span>
                        </button>

                    </div>

                </div>
            </section>
        </Fragment>
    );
}

export default EditProfileWindow;