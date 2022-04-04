import React from 'react';




const DateRangePickerWindow = ({ setStartDate, setEndDate, handleDateFilter }) => {


    return (
        <section className="absolute mt-4 top-4 left-0 rounded-lg overflow-hidden" >


            <div className="bg-slate-700 drop-shadow-lg text-slate-300 flex flex-col gap-y-2 p-2">

                <span className='text-sm text-right'>از تاریخ</span>
                <input type="date" className="form-input" onChange={event => setStartDate(event.target.value)} />
                <span className='text-sm text-right'>تا تاریخ</span>
                <input type="date" className="form-input" onChange={event => setEndDate(event.target.value)} />
                <button className='bg-emerald-400 text-sm px-2 py-3 rounded-lg text-black' onClick={() => handleDateFilter()}>اعمال</button>

            </div>


        </section>
    );
}

export default DateRangePickerWindow;