import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { AddNote, EditNote, getAllNotes } from '../Redux/Action/Notes';
import { notify } from '../Services/alerts';
import { CreateNote, UpdateNote } from '../Services/NotesServices';
import EditNoteWindow from './EditNoteWindow';
import Note from './Note';

import { AnimatePresence, motion } from 'framer-motion';

const PanelNotebook = () => {

    const [doUserNeedEditNoteWindow, setDoUserNeedEditNoteWindow] = useState(false);
    const [noteBody, setNoteBody] = useState("");
    const [editedNote, setEditedNote] = useState({});

    const notes = useSelector(state => state.Notes);
    const user = useSelector(state => state.User);
    const dispatch = useDispatch()

    useEffect(() => {
      

        let unmounted = false;

        if (!unmounted) {
            dispatch(getAllNotes(user.id))
        }

        return () => {
            unmounted = true;
        }
    }, [])

    const handleCreateNote = async () => {
        if (noteBody === "") {
            notify('یادداشتی برای اضافه کردن وجود ندارد', 'warning')
            return
        }

        const newNote = { note: noteBody };

        try {
            const { data, status } = await CreateNote(newNote);

            if (status === 201) {
                setNoteBody("")
                dispatch(AddNote(data.note))
                notify('یادداشت جدید با موفقیت اضافه شد', 'success')
            }
        } catch (e) {
            var error = Object.assign({}, e);
            if (error.response.status === 422) {
                notify('اطلاعات وارد شده صحیح نمی باشد', 'warning')
            } else {
                notify('خطای سرور', 'error')
            }
        }
    }

    const handleEditNoteWindow = (editedNote) => {
        setEditedNote(editedNote)
        setDoUserNeedEditNoteWindow(true)
    }

    const handleEditNote = async (editedNoteBody) => {
        if (editedNoteBody === "") {
            notify('یادداشت شما نمی تواند خالی باشد', 'warning')
            return
        }

        const edited_note = { ...editedNote, note: editedNoteBody };

        try {
            const { data, status } = await UpdateNote(edited_note);

            if (status === 200) {
                setEditedNote({})
                dispatch(EditNote(data.note))
                setDoUserNeedEditNoteWindow(false)
                notify('یادداشت شما با موفقیت ویرایش شد', 'success')
            }
        } catch (e) {
            var error = Object.assign({}, e);
            if (error.response.status === 422) {
                notify('اطلاعات وارد شده صحیح نمی باشد', 'warning')
            } else {
                notify('خطای سرور', 'error')
            }
        }

    }

    return (
        <Fragment>

            <Helmet>
                <title>یادداشت های شما - تریدبوک</title>
            </Helmet>


            <div className="mr-2 mt-4">
                <h2 className="text-slate-300 text-lg">یادداشت ها</h2>
            </div>

            <div className="py-4 border-b-2">
                <div className="grid grid-cols-12 mx-2 rounded-lg overflow-hidden">
                    <input type="text" value={noteBody} onChange={(e) => setNoteBody(e.target.value)} className="col-span-10 focus:outline-none py-3 text-base px-2" />
                    <button className="bg-blue-500 col-span-2 py-3 text-base" onClick={() => handleCreateNote()}>
                        <i className="fa-regular fa-plus text-lg text-white"></i>
                    </button>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4 mx-2">

                <AnimatePresence>
                    {notes.map(note => (
                        <Note key={note.id} note={note} handleEditNoteWindow={handleEditNoteWindow} />
                    ))}
                </AnimatePresence>

            </div>

            <AnimatePresence>
                {doUserNeedEditNoteWindow && (<EditNoteWindow editedNote={editedNote} setDoUserNeedEditNoteWindow={setDoUserNeedEditNoteWindow} handleEditNote={handleEditNote} />)}
                {doUserNeedEditNoteWindow && (<motion.div exit={{ opacity: 0 }} className="fixed top-0 left-0 w-full md:w-3/4 h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => setDoUserNeedEditNoteWindow(false)}></motion.div>
                )}
            </AnimatePresence>
        </Fragment>
    );
}

export default PanelNotebook;