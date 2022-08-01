import React from 'react';

import { motion } from 'framer-motion';


const DateRangePickerWindow = ({ setStartDate, setEndDate, handleDateFilter }) => {


    return (
        <motion.div key="modal"
            initial={{ opacity: 0 }} animate={{ y: [0, 25, 0], opacity: 1 }} exit={{ opacity: 0 }} className="absolute mt-16 top-4 left-0 z-30 rounded-lg overflow-hidden" >


            <div className="bg-slate-700 drop-shadow-lg text-slate-300 flex flex-col gap-y-2 p-2">

                <span className='text-sm text-right'>از تاریخ</span>
                <input type="date" className="form-input" onChange={event => setStartDate(event.target.value)} />
                <span className='text-sm text-right'>تا تاریخ</span>
                <input type="date" className="form-input" onChange={event => setEndDate(event.target.value)} />
                <button className='bg-emerald-400 text-sm px-2 py-3 rounded-lg text-black' onClick={() => handleDateFilter()}>اعمال</button>

            </div>


        </motion.div>
    );
}

export default DateRangePickerWindow;