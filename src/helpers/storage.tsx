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
    const plannerData = JSON.parse( localStorage.getItem('plannerData') || '{}');
    plannerData['tasks'] = newData;
    localStorage.setItem('plannerData', JSON.stringify(plannerData));
}