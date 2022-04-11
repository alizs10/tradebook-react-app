import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditAdminPair } from '../../Redux/Action/Admin/AdminPairs';
import { notify } from '../../Services/alerts';
import { UpdateAdminPair } from '../../Services/Admin/AdminPairsServices';

const EditAdminPairWindow = ({ setDoUserNeedEditAdminPairWindow, adminPair }) => {

    const [name, setName] = useState("")
    const [pairId, setPairId] = useState("")
    const [type, setType] = useState("")
    const [status, setStatus] = useState("")
    const [, forceUpdate] = useState("");
   

    useEffect(() => {
        if (isEmpty(adminPair)) return
        setName(adminPair.name)
        setType(adminPair.type)
        setStatus(adminPair.status)
        setPairId(adminPair.id)
    }, [adminPair])

    const dispatch = useDispatch()

    const handleEditAdminPair = async () => {
            let editedAdminPair = {
                id: pairId, name, type, status, _method: "PUT"
            }

            try {
                const { data, status } = await UpdateAdminPair(editedAdminPair);

                if (status === 200) {
                    dispatch(EditAdminPair(data.pair))
                    setDoUserNeedEditAdminPairWindow(false)
                    notify('جفت ارز موردنظر با موفقیت ویرایش شد', 'success')
                }
            }

            catch (error) {
                notify('مشکلی پیش آمده است', 'error')
            }

        
    }

    return (
        <section className="absolute top-4 z-40 p-2 w-full">

            <div
                className="flex flex-col gap-y-1 mx-2 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900 dark:text-white overflow-hidden">

                <div className="flex justify-between items-center p-2">
                    <h2 className="text-sm">جزییات محصول</h2>

                    <button className="p-2 text-lg dark:text-slate-300" onClick={() => setDoUserNeedEditAdminPairWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="p-2 flex flex-col gap-y-1">

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label className="text-xs h-fit">نام جفت ارز</label>
                        <input type="text" className="form-input" value={name} onChange={event => {
                            setName(event.target.value);
                        }} id="name" />

                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="type">نوع</label>
                        <select className='form-input' id="type" value={type} onChange={event => {
                            setType(event.target.value);
                        }}>
                            <option value="0">crypto</option>
                            <option value="1" >forex</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-y-1 rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
                        <label htmlFor="status">وضعیت</label>
                        <select className='form-input' id="status" value={status} onChange={event => {
                            setStatus(event.target.value);
                        }}>
                            <option value="0">غیرفعال</option>
                            <option value="1" >فعال</option>
                        </select>
                    </div>



                </div>


                <div className="p-2">
                    <div className="flex justify-end gap-x-2 text-black">
                        <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 flex items-center" onClick={() => setDoUserNeedEditAdminPairWindow(false)}>
                            <i className="fa-regular fa-ban text-xs lg:text-base ml-2"></i>
                            انصراف</button>
                        <button className="px-4 py-2 rounded-lg text-xs bg-yellow-300 flex items-center" onClick={() => handleEditAdminPair()}>
                            <i className="fa-regular fa-check text-xs lg:text-base ml-2"></i>
                            ویرایش</button>
                    </div>
                </div>


            </div>

        </section>
    );
}

export default EditAdminPairWindow;