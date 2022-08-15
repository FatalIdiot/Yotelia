export const CALC_TASKS = 'CALC_TASKS';
export function calcTasks() {
    return {
        type: CALC_TASKS
    };
}

interface CalcTasks {
    type: typeof CALC_TASKS
}

export type DayTasksActionTypes = CalcTasks;
