import { TasksPool, Task, TaskType, DayTasksData } from 'types';
import moment from 'moment';
import { pullTasks } from './storage';

export function getDayData(tasksPool: TasksPool | null = null) : DayTasksData {
    if(!tasksPool) { // pull from local storage
        tasksPool = pullTasks();
    }
    const dayTasks: Array<Task> = dayTasksCalc(tasksPool);
    return {
        dayTasks: dayTasks,
        curTask: getCurTask(dayTasks)
    };
}

export function dayTasksCalc(tasksPool: TasksPool) : Array<Task> {
    const curDay = moment().day();
    const tasks: Array<Task> = [];
    tasksPool.single.forEach((task: Task) => {
        if(moment().isSame(task.date, 'day')) {
            tasks.push(task);
        }
    });
    tasksPool.daily.forEach((task: Task) => {
        if(task.type === TaskType.EveryDay || // add all everyday tasks
            (task.type === TaskType.WeekDays && curDay != 6 && curDay != 7) || // add weekdays task if is not weekend 
            (task.type === TaskType.Daily) && task.days[curDay - 1] // check if is a day for the daily task
        ) {
            tasks.push(task);
            return;
        }
    });

    // Sort tasks by start time
    tasks.sort((task1: Task, task2: Task) => {
        if(moment(task1.startTime).isBefore( moment(task2.startTime) ))
            return -1;
        else return 1;
    });

    return tasks;
}

export function getCurTask(dayTasks: Array<Task>) : Task | null {
    for(let i = 0; i < dayTasks.length; i++) {
        const task: Task = dayTasks[i];
        if(moment().isBetween(task.startTime, task.endTime)) {
            return dayTasks[i];
        }
    }
    return null;
}