import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';



const DetailsDiscountWindow = ({ setDoUserNeedDetailsDiscountWindow, discount, handleDelDiscount, setDoUserNeedEditDiscountWindow }) => {

    const [userName, setUserName] = useState("")
    const [planName, setPlanName] = useState("")
    const [code, setCode] = useState("")
    const [value, setValue] = useState("")
    const [status, setStatus] = useState("")
    const [, forceUpdate] = useState("");
    


    useEffect(() => {
        if (isEmpty(discount)) return

        setUserName(discount.user_name)
        setPlanName(discount.plan_name)
        setCode(discount.code)
        setValue(discount.value)
        setStatus(discount.status)
    }, [discount])


    const handleShowEditDiscountWindow = () => {
        setDoUserNeedDetailsDiscountWindow(false)
        setDoUserNeedEditDiscountWindow(true)
    }


    return (
        <section className="absolute top-4 z-40 p-2 w-full">

            <div
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900 dark:text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">جزییات سفارش</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedDetailsDiscountWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>


                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">کاربر</span>
                    <span className="text-base">{userName}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">محصول</span>
                    <span className="text-base">{planName}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">کد تخفیف</span>
                    <span className="text-base">{code}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">مقدار</span>
                    <span className="text-base">{value}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">وضعیت</span>
                    <span className="text-base">
                        {status === 0 ? "معتبر" : "منقضی"}
                    </span>
                </div>
                

                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => handleDelDiscount(discount.id)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            حذف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-yellow-300 flex items-center" onClick={() => handleShowEditDiscountWindow()}>
                            <i className="fa-regular fa-edit text-xs lg:text-base ml-2"></i>
                            ویرایش</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default DetailsDiscountWindow;