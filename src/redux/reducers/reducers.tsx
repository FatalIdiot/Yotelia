import { combineReducers } from "redux";

import TasksReducer from './tasks/reducer';
import DayTasksReducer from './dayTasks/reducer';
import NotificationsReducer from './notifications/reducer';
import CancelledTasksReducer from './cancelledTasks/reducer';

export default combineReducers({
    tasks: TasksReducer,
    dayTasks: DayTasksReducer,
    notifications: NotificationsReducer,
    cancelledTasks: CancelledTasksReducer
});