import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';



const DetailsAdminPairWindow = ({ setDoUserNeedDetailsAdminPairWindow, adminPair, handleDelAdminPair, setDoUserNeedEditAdminPairWindow }) => {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [status, setStatus] = useState("")
    const [, forceUpdate] = useState("");


    useEffect(() => {
        if (isEmpty(adminPair)) return

        setName(adminPair.name)
        setType(adminPair.type)
        setStatus(adminPair.status)
    }, [adminPair])


    const handleShowEditAdminPairWindow = () => {
        setDoUserNeedDetailsAdminPairWindow(false)
        setDoUserNeedEditAdminPairWindow(true)
    }


    return (
        <section className="absolute top-4 z-40 p-2 w-full">

            <div
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-900 text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">جزییات جفت ارز</h2>

                    <button className="p-2 text-lg text-slate-300" onClick={() => setDoUserNeedDetailsAdminPairWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>



                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">نام جفت ارز</span>
                    <span className="text-base">{name}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">نوع</span>
                    <span className="text-base">{type === 0 ? "crypto" : "forex"}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">وضعیت</span>
                    <span className="text-base">{status === 0 ? "غیرفعال" : "فعال"}</span>
                </div>





                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => handleDelAdminPair(adminPair.id)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            حذف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-yellow-300 flex items-center" onClick={() => handleShowEditAdminPairWindow()}>
                            <i className="fa-regular fa-edit text-xs lg:text-base ml-2"></i>
                            ویرایش</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default DetailsAdminPairWindow;