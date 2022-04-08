import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { AddAdminPair } from '../../Redux/Action/Admin/AdminPairs';
import { notify } from '../../Services/alerts';
import { CreateAdminPair } from '../../Services/Admin/AdminPairsServices';

const CreateAdminPairWindow = ({ setDoUserNeedCreateAdminPairWindow }) => {

    const [name, setName] = useState("")
    const [type, setType] = useState("0")
    const [status, setStatus] = useState("1")
    const [, forceUpdate] = useState("");
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی می باشد",
            numeric: "باید عدد وارد کنید"
        },
        element: message => <span className='text-xs text-red-400'>{message}</span>
    }));

    const dispatch = useDispatch()

    const handleCreateAdminPair = async () => {
        if (validator.current.allValid()) {
            let newAdminPair = {
                name, type, status
            }

            try {
                const { data, status } = await CreateAdminPair(newAdminPair);

                if (status === 200) {
                    dispatch(AddAdminPair(data.pair))
                    setDoUserNeedCreateAdminPairWindow(false)
                    notify('جفت ارز جدید با موفقیت اضافه شد', 'success')
                }
            }

            catch (error) {
                notify('مشکلی پیش آمده است', 'error')
            }


            console.log(newAdminPair);
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
                    <h2 className="text-sm">جزییات محصول</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedCreateAdminPairWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="p-2 flex flex-col gap-y-1">

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">نام جفت ارز</label>
                        <input type="text" className="form-input" value={name} onChange={event => {
                            setName(event.target.value);
                            validator.current.showMessageFor('name')
                        }} id="name" />
                        {validator.current.message("name", name, "required|string")}

                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="type">نوع</label>
                        <select className='form-input' id="type" value={type} onChange={event => {
                            setType(event.target.value);
                            validator.current.showMessageFor('type')
                        }}>
                            <option value="0">crypto</option>
                            <option value="1" >forex</option>
                        </select>
                        {validator.current.message("type", type, "required|in:0,1")}
                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="status">وضعیت</label>
                        <select className='form-input' id="status" value={status} onChange={event => {
                            setStatus(event.target.value);
                            validator.current.showMessageFor('status')
                        }}>
                            <option value="0">غیرفعال</option>
                            <option value="1" >فعال</option>
                        </select>
                        {validator.current.message("status", status, "required|in:0,1")}
                    </div>


                </div>


                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => setDoUserNeedCreateAdminPairWindow(false)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            انصراف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-green-500 flex items-center" onClick={() => handleCreateAdminPair()}>
                            <i className="fa-regular fa-check text-xs lg:text-base ml-2"></i>
                            ثبت</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default CreateAdminPairWindow;