import { FunctionComponent, useState, useEffect } from 'react';
import classnames from 'classnames';
import { NotificationFull } from 'types';

type NotificationItemProps = {
    notification: NotificationFull,
    removeNotification: Function
}

const NotificationItem: FunctionComponent<NotificationItemProps> = (props) => {
    const { type, label, text } = props.notification;

    const [isOpened, setOpened] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpened(true);

            setTimeout(() => {
                setOpened(false);
                setTimeout(() => {
                    props.removeNotification();
                }, 1000);
            }, 5000);
        }, 100);
    }, []);

    const translateStr = isOpened ? '0%' : '100%';
    const bgColorClass = type === 'success' ? 'bg-success' : 'bg-danger';
    return (
        <div className={classnames("notification p-2 mt-1", bgColorClass, { "closed": !isOpened})}
            style={{ transform: `translateX(${ translateStr })`, transition: '1s', opacity: isOpened ? '1' : '0' }}
        >
            <div className="notification-title fw-bold">
                { label }
            </div>
            <div className="notification-message">
                <small>{ text }</small>
            </div>
        </div>
    );
}

export default NotificationItem;