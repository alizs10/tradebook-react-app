export const setStatistics = data => {
    return async dispatch => {
        await dispatch({ type: "INIT_STATISTICS", payload: data })
    }
}