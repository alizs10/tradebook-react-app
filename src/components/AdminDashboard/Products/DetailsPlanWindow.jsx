import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';



const DetailsPlanWindow = ({ setDoUserNeedDetailsPlanWindow, plan, handleDelPlan, setDoUserNeedEditPlanWindow }) => {

    const [name, setName] = useState("")
    const [validFor, setValidFor] = useState("")
    const [price, setPrice] = useState("")
    



    useEffect(() => {
        if (isEmpty(plan)) return

        setName(plan.name)
        setValidFor(plan.valid_for)
        setPrice(plan.price)
    }, [plan])


    const handleShowEditPlanWindow = () => {
        setDoUserNeedDetailsPlanWindow(false)
        setDoUserNeedEditPlanWindow(true)
    }


    return (
        <section className="absolute top-4 z-40 p-2 w-full">

            <div
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900 dark:text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">جزییات محصول</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedDetailsPlanWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>



                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">نام محصول</span>
                    <span className="text-base">{name}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">مدت اشتراک</span>
                    <span className="text-base">{validFor + " روز"}</span>
                </div>
                <div className="col-span-1 rounded-lg bg-slate-700 mx-2 flex flex-col gap-y-1 p-2">
                    <span className="text-xs pb-2 border-b-2 border-slate-800">قیمت</span>
                    <span className="text-base">{price + " تومان"}</span>
                </div>





                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => handleDelPlan(plan.id)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            حذف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-yellow-300 flex items-center" onClick={() => handleShowEditPlanWindow()}>
                            <i className="fa-regular fa-edit text-xs lg:text-base ml-2"></i>
                            ویرایش</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default DetailsPlanWindow;