export const CHECK_TASK = 'CHECK_TASK';
export function checkTask(taskId: string) {
    return {
        type: CHECK_TASK,
        payload: taskId
    };
}

interface CheckTask {
    type: typeof CHECK_TASK,
    payload: string
}

export type CancelledTasksTypes = CheckTask;
