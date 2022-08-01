import { getUsers } from "../../../Services/Admin/UsersServices";


export const getAllUsers = () => {
    return async dispatch => {
        const { data } = await getUsers();
        await dispatch({ type: "INIT_USERS", payload: data.users })
    }
}

export const EditUser = (edited_user) => {
    return async (dispatch, getState) => {
        let usersInstance = getState().Users;
        let filteredUsers = usersInstance.filter(user => user.id !== edited_user.id)
        filteredUsers = [...filteredUsers, edited_user]

        await dispatch({ type: "UPDATE_USER", payload: filteredUsers })
    }
}

export const DeleteUser = (user_id) => {
    return async (dispatch, getState) => {
        const usersInstance = getState().Users;
        const filteredUsers = usersInstance.filter(user => user.id !== user_id)

        await dispatch({ type: "DELETE_USER", payload: filteredUsers })
    }
}