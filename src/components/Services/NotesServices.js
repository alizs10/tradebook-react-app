import http from "./http";
import config from "./config.json";


export const CreateNote = async (note) => {
    return await http.post(`${config['base_url']}/api/panel/notes/store`, JSON.stringify(note))
}

export const UpdateNote = async (note) => {
    return await http.put(`${config['base_url']}/api/panel/notes/${note.id}/update`, JSON.stringify(note))
}

export const DestroyNote = (note_id) => {
    return http.get(`${config['base_url']}/api/panel/notes/${note_id}/destroy`)
}