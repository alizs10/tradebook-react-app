import React, { Fragment } from 'react';
import moment from 'moment';
import { confirm, notify } from '../Services/alerts';
import { DestroyNote } from '../Services/NotesServices';
import { useDispatch } from 'react-redux';
import { DeleteNote } from '../Redux/Action/Notes';

import { motion } from 'framer-motion';

const Note = ({ note, handleEditNoteWindow }) => {

    const correct_date = moment(note.created_at).format("HH:mm YYYY-MM-DD");

    const dispatch = useDispatch()

    const handleDeleteNote = () => {
        confirm('حذف یادداشت', 'یادداشت شما حذف شود؟', async () => {
            const { status } = await DestroyNote(note.id);

            if (status === 200) {
                dispatch(DeleteNote(note))
                notify('یادداشت شما با موفقیت حذف شد', 'success')
            }
        }, () => {
            notify('درخواست شما لغو شد', 'warning')
        })
    }


    return (
      
            <motion.div animate={{ x: [5,0] }} exit={{ opacity: 0 }} className="p-2 col-span-1 bg-slate-300 text-slate-900 text-base rounded-lg shadow-lg h-fit">
                <div className="flex justify-between border-b-2 border-slate-500 relative">
                    <span className="text-xxs">{correct_date}</span>
                    <div className="flex gap-x-2 absolute bottom-0 left-0 mb-2 ml-2">
                        <button className="text-xs" onClick={() => handleEditNoteWindow(note)}>
                            <i className="fa-solid fa-edit"></i>
                        </button>
                        <button className="text-xs" onClick={() => handleDeleteNote()}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>

                <p className="text-base">
                    {note.note}
                </p>
            </motion.div>
     
    );
}

export default Note;