import { Task } from 'types';
import moment from 'moment';

export const dayNames: Array<string> = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

export const sortTasksByTime = (task1: Task, task2: Task) => {
    const time1 = moment().set('hour', moment(task1.startTime).hour()).set('minute', moment(task1.startTime).minute());
    const time2 = moment().set('hour', moment(task2.startTime).hour()).set('minute', moment(task2.startTime).minute());
    if(moment(time1).isBefore( moment(time2) ))
        return -1;
    else return 1;
};

export const sortTasksByType = (task1: Task, task2: Task) => {
    return task1.type > task2.type ? -1 : 1;
};