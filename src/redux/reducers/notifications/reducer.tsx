import { ADD_NOTIFICATION, ADD_NOTIFICATION_ERROR, ADD_NOTIFICATION_SUCCESS, REMOVE_NOTIFICATION, NotificationsActionTypes } from './actionTypes';
import { NotificationFull } from 'types';

import createGUID from 'helpers/createGUID';

export default (state: Array<NotificationFull> = [], action: NotificationsActionTypes) => {
    const newGuid = createGUID();
    
    switch(action.type) {
        case ADD_NOTIFICATION:
            return [...state, { id: newGuid, ...action.payload }];
        case ADD_NOTIFICATION_ERROR:
            return [...state, { id: newGuid, ...action.payload, type: 'error' }];
        case ADD_NOTIFICATION_SUCCESS:
            return [...state, { id: newGuid, ...action.payload, type: 'success' }];
        case REMOVE_NOTIFICATION:
            const newState = state.filter(item => item.id !== action.payload);
            return newState;
        default:
            return state;
    }
}