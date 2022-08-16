import { Task, TasksPool } from 'types';
import moment from 'moment';

const removePastTasks = (tasks: TasksPool) : TasksPool => {
    const newTasksData = {...tasks};

    // Delete expired tasks from prev days
    newTasksData.single = newTasksData.single.filter((task: Task) => {
        if(moment().isAfter(task.date, 'day'))
            return false;
        return true;
    });

    // Update storage
    updateTasksPool(tasks);

    return newTasksData;
}

const getStoredData = () => {
    return JSON.parse( localStorage.getItem('plannerData') || '{}');
}

const storeData = (key: string, data: any) => {
    const plannerData = getStoredData();
    plannerData[key] = data;
    localStorage.setItem('plannerData', JSON.stringify(plannerData));
}

export const getCancelledTasks = () : Array<string> => {
    const plannerData = getStoredData();
    return plannerData.cancelledTasks || [];
}

export const storeCancelledTasks = (newTasks: Array<string>) => {
    storeData('cancelledTasks', newTasks);
}

export const pullTasks = () : TasksPool => {
    const plannerData = JSON.parse( localStorage.getItem('plannerData') || '{}');
    if(plannerData.tasks) {
        return removePastTasks(plannerData.tasks);
    } else return {
        single: [],
        daily: []
    }
}

export const updateTasksPool = (newData: TasksPool) => {
    storeData('tasks', newData);
}