import React, { useState } from 'react';

import { motion } from 'framer-motion';

const EditNoteWindow = ({ setDoUserNeedEditNoteWindow, editedNote, handleEditNote }) => {

    const [noteBody, setNoteBody] = useState(editedNote.note)

    return (
        <motion.div key="modal"
            initial={{ opacity: 0 }} animate={{ y: 25, x: "-50%", opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-0 left-1/2 w-4/5 transform -translate-x-1/2 mt-4 z-50 rounded-lg drop-shadow-lg bg-slate-600" >
            <div className="w-full text-slate-100 p-2 flex flex-col gap-y-2">

                <div className="flex justify-between items-center pb-2 border-b-2 border-slate-400">
                    <h2 className="text-base">ویرایش یادداشت</h2>

                    <button className="p-2 text-base" onClick={() => setDoUserNeedEditNoteWindow(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2">
                    <div className="clo-span-1 flex flex-col gap-y-1">
                        <label htmlFor="note">یادداشت</label>
                        <input type="text" className="form-input" id="note" value={noteBody} onChange={(e) => setNoteBody(e.target.value)} />
                    </div>

                </div>

                <div className="mt-4 flex justify-end">

                    <button className="px-4 py-2 rounded-lg text-base bg-yellow-300 text-slate-900 flex justify-center items-center" onClick={() => handleEditNote(noteBody)}>
                        <i className="fa-regular fa-edit"></i>
                        <span className='mr-1'>ویرایش</span>
                    </button>
                </div>

            </div>
        </motion.div>

    );
}

export default EditNoteWindow;