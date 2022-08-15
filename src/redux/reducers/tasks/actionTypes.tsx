import { Task } from 'types';

export const ADD_TASK = 'ADD_TASK';
export function addTask(taskData: Task) {
    return {
        type: ADD_TASK,
        payload: taskData
    };
}

export const CHANGE_TASK = 'CHANGE_TASK';
export function changeTask(id: string, taskData: Task) {
    return {
        type: CHANGE_TASK,
        payload: {
            id, taskData
        }
    };
}

export const REMOVE_TASK = 'REMOVE_TASK';
export function removeTask(taskId: string) {
    return {
        type: REMOVE_TASK,
        payload: taskId
    };
}

export const CLEAR_ALL = 'CLEAR_ALL';
export function clearAll() {
    return {
        type: CLEAR_ALL
    };
}

interface AddTask {
    type: typeof ADD_TASK,
    payload: Task
}

interface ChangeTask {
    type: typeof CHANGE_TASK,
    payload: {
        id: string,
        taskData: Task
    }
}

interface RemoveTask {
    type: typeof REMOVE_TASK,
    payload: string
}

interface ClearAll {
    type: typeof CLEAR_ALL
}

export type TasksActionTypes = AddTask | ChangeTask | RemoveTask | ClearAll;
