import { CHECK_TASK, CancelledTasksTypes } from './actionTypes';
import { getCancelledTasks, storeCancelledTasks } from 'helpers/storage';

const initState: Array<string> = getCancelledTasks();

export default (state = initState, action: CancelledTasksTypes) => {
    switch(action.type) {
        case CHECK_TASK:
            let newIds: Array<string>;
            if(state.indexOf(action.payload) !== -1) {
                newIds = state.filter((id: string) => id !== action.payload);
            } else {
                newIds = [...state, action.payload];
            }
            storeCancelledTasks(newIds);
            console.log('new cancelled', newIds);
            return newIds;
        default:
            return state;
    }
}