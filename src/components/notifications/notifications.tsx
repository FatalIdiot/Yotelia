import { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from 'redux/reducers/notifications/actionTypes';
import { NotificationFull } from 'types';

import NotificationItem from './notificationItem';

import './notifications.scss';

const Notifications: FunctionComponent = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((state: any) => state.app.notifications);

    const remove = (notification: NotificationFull) => {
        dispatch(removeNotification(notification.id));
    }

    return (
        <div className="notifications-container">
            {
                notifications.map((notification: NotificationFull) => (
                    <NotificationItem key={notification.id} 
                        notification={notification} removeNotification={() => remove(notification)}
                    />))
            }
        </div>
    );
}

export default Notifications;