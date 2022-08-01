import React, { useState } from 'react';
import { notify } from '../../Services/alerts';
import { storeAnswerTicket } from '../../Services/TicketsService';
import { asnwerTicketValidation } from '../../Services/validation';

import { motion } from 'framer-motion';

const AnswerInput = ({ parent_id, setReplays, replays, toggleReplayInput }) => {

    const [body, setBody] = useState("")
    const [errors, setErrors] = useState({})
    const handleSendAnswer = async () => {

        let answer = {
            parent_id, body
        }
        const { success, errors } = asnwerTicketValidation(answer);
        if (success) {
            setErrors({})
            try {

                const { status, data } = await storeAnswerTicket(answer, parent_id)

                if (status == 200) {
                    setReplays([...replays, data.answer])
                    toggleReplayInput()
                    notify("پاسخ شما ارسال شد", "success")
                }

            } catch (error) {

            }
        } else {
            setErrors(errors)
        }

    }

    const repTextArea = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -100 },
    }

    return (
        <motion.div initial="hidden"
        animate="visible" variants={repTextArea} className='flex flex-col gap-y-2'>
            <textarea className='form-input' rows={5} value={body} onChange={event => setBody(event.target.value)} />
            {errors.body && (<span className='text-xxs text-red-400'>{errors.body}</span>)}
            <div className='flex justify-between'>
                <div className='fix'></div>
                <div className='flex gap-x-1'>
                    <button className="rounded-lg px-3 py-2 text-xs text-gray-400 bg-slate-800 flex gap-x-2 items-center" onClick={() => toggleReplayInput()}>
                        <i className="fa-regular fa-ban text-base"></i>
                        لغو
                    </button>
                    <button className="rounded-lg px-3 py-2 text-xs bg-slate-800 flex gap-x-2 items-center" onClick={() => handleSendAnswer()}>
                        <i className="fa-duotone fa-paper-plane text-base text-blue-400"></i>
                        <span className="text-slate-300">ارسال</span>
                    </button>
                </div>
            </div>

        </motion.div>
    );
}

export default AnswerInput;