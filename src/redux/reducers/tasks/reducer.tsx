import { ADD_TASK, CHANGE_TASK, REMOVE_TASK, CLEAR_ALL, TasksActionTypes } from './actionTypes';
import { TaskType, TasksPool } from 'types';
import { pullTasks, updateTasksPool } from 'helpers/storage';
import { Task } from 'types';

const initState: TasksPool = pullTasks();

export default (state = initState, action: TasksActionTypes) => {
    let newData: TasksPool;
    switch(action.type) {
        case ADD_TASK:
            const updatedTasksList = action.payload.type === TaskType.Once ? {
                single: [...state.single, action.payload]
            } : {
                daily: [...state.daily, action.payload]
            }
            newData = Object.assign({}, state, updatedTasksList);
            break;
        case CHANGE_TASK:
            const editTaskList: any = {};
            let index = state.single.findIndex((task: Task) => task.id === action.payload.id);
            if(index !== -1) {
                editTaskList.single = [...state.single];
                editTaskList.single[index] = action.payload.taskData;
            } else {
                index = state.daily.findIndex((task: Task) => task.id === action.payload.id);
                editTaskList.daily = [...state.daily];
                editTaskList.daily[index] = action.payload.taskData;
            }
            newData = Object.assign({}, state, editTaskList);
            break;
        case REMOVE_TASK:
            newData= {
                single: state.single.filter((task: Task) => task.id !== action.payload),
                daily: state.daily.filter((task: Task) => task.id !== action.payload)
            };
            break;
        case CLEAR_ALL:
            newData = {
                single: [],
                daily: []
            };
            break;
        default:
            return state;
    }
    updateTasksPool(newData);
    return newData;
}