import { getNotes } from "../../Services/DataLoader";

export const getAllNotes = (user_id) => {
    return async dispatch => {
        const { data } = await getNotes(user_id);
        await dispatch({ type: "INIT_NOTES", payload: data.notes })
    }
}

export const AddNote = (note) => {
    return async (dispatch, getState) => {
        const notes = getState().Notes;
        const notesInstance = [...notes, note];
        await dispatch({ type: "ADD_NOTE", payload: notesInstance })
    }
}

export const EditNote = (edited_note) => {
    return async (dispatch, getState) => {
        const notesInstance = getState().Notes;
        const noteIndex = notesInstance.findIndex(note => note.id === edited_note.id)
        const note = notesInstance[noteIndex];
        note.note = edited_note.note;

        await dispatch({ type: "UPDATE_NOTE", payload: notesInstance })
    }
}

export const DeleteNote = (note) => {
    return async (dispatch, getState) => {
        const notesInstance = getState().Notes;
        const filteredNotes = notesInstance.filter(ele => ele.id !== note.id)

        await dispatch({ type: "DELETE_NOTE", payload: filteredNotes })
    }
}