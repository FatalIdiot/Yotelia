export type StateData = {
    data: StoredData,
    dayTasks: Array<Task>
}

export type StoredData = {
    tasks: TasksPool,
    settings: SettingsData
}

export type TasksPool = {
    single: Array<Task>,
    daily: Array<Task>
}

export type DayTasksData = {
    dayTasks: Array<Task>,
    curTask: Task | null
}

export type SettingsData = {

}

export type Task = {
    id: string,
    title: string,
    description: string,
    type: TaskType,
    color: string,
    startTime: string,
    endTime: string,
    days: Array<boolean>,
    date: string // for one time tasks
}

export enum TaskType {
    Once = 0,
    Daily,
    WeekDays,
    EveryDay
};

export type rgbColor = {
    r: number,
    g: number,
    b: number
};

export type NotificationFull = {
    id: string,
    label: string,
    text: string,
    type: string
};

export type NotificationTyped = {
    label: string,
    text: string,
    type: string
};

export type Notification = {
    label: string,
    text: string
};

export type TaskText = {
    title: string,
    description: string
}