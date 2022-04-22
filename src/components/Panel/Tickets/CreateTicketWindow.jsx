import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTicket } from '../../Redux/Action/Tickets';
import { notify } from '../../Services/alerts';
import { storeTicket } from '../../Services/TicketsService';
import { ticketValidation } from '../../Services/validation';

const CreateTicketWindow = ({ setDoUserWantCreateTicketWindow, parent_id = null }) => {

    const [subject, setSubject] = useState("")
    const [type, setType] = useState("")
    const [body, setBody] = useState("")
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()

    const handleCreateTicket = async () => {

        let newTicket = {
            subject, type, body, parent_id
        }
        const { success, errors } = ticketValidation(newTicket);
        if (success) {
            setErrors({})
            try {
                const { data, status } = await storeTicket(newTicket)

                if (status == 200) {
                    dispatch(createTicket(data.ticket))
                    setDoUserWantCreateTicketWindow(false)
                    notify("تیکت شما با موفقیت ارسال شد", "success")
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setErrors(errors)
        }


    }



    return (
        <section
            className="absolute top-0 left-1/2 w-4/5 transform -translate-x-1/2 mt-4 z-50 rounded-lg drop-shadow-lg bg-slate-600">
            <div className="w-full text-slate-100 p-2 flex flex-col gap-y-2">

                <div className="flex justify-between items-center pb-2 border-b-2 border-slate-400">
                    <h2 className="text-base">ارسال تیکت جدید</h2>

                    <button className="p-2 text-base" onClick={() => setDoUserWantCreateTicketWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label for="subject">عنوان تیکت</label>
                        <input type="text" className="form-input" id='subject' value={subject} onChange={(event) => setSubject(event.target.value)} />
                        {errors.subject && (<span className='text-xxs text-red-400'>{errors.subject}</span>)}
                    </div>
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label for="">نوع تیکت</label>
                        <select className="form-input" value={type} onChange={(event) => setType(event.target.value)}>
                            <option value="">نوع تیکت را انتخاب کنید</option>
                            <option value="0">گزارش مشکل</option>
                            <option value="1">پیشنهاد</option>
                            <option value="2">انتقاد</option>
                            <option value="3">سوال</option>
                            <option value="4">دیگر موارد</option>
                        </select>
                        {errors.type && (<span className='text-xxs text-red-400'>{errors.type}</span>)}

                    </div>
                    <div className="col-span-2 flex flex-col gap-y-1">
                        <label for="">متن تیکت</label>
                        <textarea className="form-input w-full" rows="5" value={body} onChange={(event) => setBody(event.target.value)}></textarea>
                        {errors.body && (<span className='text-xxs text-red-400'>{errors.body}</span>)}
                    </div>

                </div>

                <div className="mt-4 flex justify-end gap-x-2">
                    <button className="px-4 py-2 rounded-lg text-xs bg-slate-300 text-slate-900 flex gap-x-1 items-center" onClick={() => setDoUserWantCreateTicketWindow(false)}>
                        <i className="fa-light fa-ban text-sm"></i>
                        انصراف
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg text-xs bg-emerald-400 text-slate-900 flex gap-x-1 items-center" onClick={() => handleCreateTicket()}>
                        <i className="fa-light fa-paper-plane text-sm"></i>
                        ارسال تیکت
                    </button>
                </div>

            </div>
        </section>
    );
}

export default CreateTicketWindow;