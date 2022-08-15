import { CALC_TASKS, DayTasksActionTypes } from './actionTypes';
import { DayTasksData } from 'types';
import { getDayData } from 'helpers/dayTasksCalc';

const initState: DayTasksData = getDayData();

export default (state = initState, action: DayTasksActionTypes) => {
    switch(action.type) {
        case CALC_TASKS:
            return getDayData();
        default:
            return state;
    }
}