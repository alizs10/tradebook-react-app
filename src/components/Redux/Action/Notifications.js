import { getNotifications } from "../../Services/NotificationsService";

export const getAllNotifications = () => {
    return async dispatch => {
        const { data } = await getNotifications();
        await dispatch({ type: "INIT_NOTIFICATIONS", payload: data.notifications })
    }
}

export const updateNotification = (notification_id) => {
    return async (dispatch, getState) => {
        const notificationsInstance = getState().Notifications;
        const notificationIndex = notificationsInstance.findIndex(notification => notification.id === notification_id)
        const notification = notificationsInstance[notificationIndex];
        notification.seen = 1;

        await dispatch({ type: "SEEN_NOTIFICATION", payload: notificationsInstance })
    }
}

