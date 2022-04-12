import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddPlan } from '../../Redux/Action/Admin/Plans';
import { notify } from '../../Services/alerts';
import { CreatePlan } from '../../Services/Admin/PlansServices';
import { planValidation } from '../../Services/Admin/adminValidation';

const CreatePlanWindow = ({ setDoUserNeedCreatePlanWindow }) => {

    const [name, setName] = useState("")
    const [validFor, setValidFor] = useState("")
    const [price, setPrice] = useState("")
    const [errors, setErrors] = useState({})



    const dispatch = useDispatch()

    const handleCreatePlan = async () => {

        let newPlan = {
            name, valid_for: validFor, price
        }
        const { success, errors } = planValidation(newPlan);

        if (success) {
            setErrors({})
            try {
                const { data, status } = await CreatePlan(newPlan);

                if (status === 200) {
                    dispatch(AddPlan(data.plan))
                    setDoUserNeedCreatePlanWindow(false)
                    notify('محصول جدید با موفقیت اضافه شد', 'success')
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
                    <h2 className="text-sm">جزییات محصول</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedCreatePlanWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="p-2 flex flex-col gap-y-1">

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">نام محصول:</label>
                        <input type="text" className="form-input" value={name} onChange={event => {
                            setName(event.target.value);
                        }} id="name" />
                        {errors.name && (<span className='text-xxs text-red-400'>{errors.name}</span>)}
                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">مدت اشتراک (روز):</label>
                        <input type="text" className="form-input" value={validFor} onChange={event => {
                            setValidFor(event.target.value);
                        }} id="valid_for" />
                        {errors.valid_for && (<span className='text-xxs text-red-400'>{errors.valid_for}</span>)}
                    </div>
                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">قیمت:</label>
                        <input type="text" className="form-input" value={price} onChange={event => {
                            setPrice(event.target.value);
                        }} id="price" />
                        {errors.price && (<span className='text-xxs text-red-400'>{errors.price}</span>)}
                    </div>


                </div>


                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => setDoUserNeedCreatePlanWindow(false)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            انصراف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-green-500 flex items-center" onClick={() => handleCreatePlan()}>
                            <i className="fa-regular fa-check text-xs lg:text-base ml-2"></i>
                            ثبت</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default CreatePlanWindow;