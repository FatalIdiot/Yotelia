import { Notification, NotificationTyped, NotificationFull } from 'types';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export function addNotification(notificationData: NotificationTyped) {
    return {
        type: ADD_NOTIFICATION,
        payload: notificationData
    };
}

export const ADD_NOTIFICATION_ERROR = 'ADD_NOTIFICATION_ERROR';
export function addNotificationError(notificationData: Notification) {
    return {
        type: ADD_NOTIFICATION_ERROR,
        payload: notificationData
    };
}

export const ADD_NOTIFICATION_SUCCESS = 'ADD_NOTIFICATION_SUCCESS';
export function addNotificationSuccess(notificationData: Notification) {
    return {
        type: ADD_NOTIFICATION_SUCCESS,
        payload: notificationData
    };
}

export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export function removeNotification(id: string) {
    return {
        type: REMOVE_NOTIFICATION,
        payload: id
    };
}

interface AddNotification {
    type: typeof ADD_NOTIFICATION,
    payload: NotificationTyped
}

interface AddNotificationError {
    type: typeof ADD_NOTIFICATION_ERROR,
    payload: Notification
}

interface AddNotificationSuccess {
    type: typeof ADD_NOTIFICATION_SUCCESS,
    payload: Notification
}

interface RemoveNotification {
    type: typeof REMOVE_NOTIFICATION,
    payload: string
}

export type NotificationsActionTypes = AddNotification | AddNotificationError | AddNotificationSuccess | RemoveNotification;
