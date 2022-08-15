import moment from 'moment';
import { FunctionComponent } from 'react';
import { Task } from 'types';


import './tasksList.scss';

type TasksListProps = {
    tasks: Array<Task>,
    curTaskId: string
}

const TasksList: FunctionComponent<TasksListProps> = ({ tasks, curTaskId }) => {
    const renderColorSphere = (color: string) => {
        return (
            <div className="color-sphere d-inline-block me-3" style={{ backgroundColor: color }} />
        );
    }

    return (
        <div className="tasks-list p-2">
            { 
                tasks.map((task: Task) => (
                    <div className="task-item d-flex align-items-center my-2">
                        { renderColorSphere(task.color) }
                        <div className="task-item-fields">
                            <div className={`item-title ${task.description ? 'c-help' : ''} ${curTaskId === task.id ? 'fw-bold' : ''}`} 
                                title={task.description}
                            >
                                { task.title }
                            </div>
                            <div className="item-time fw-bold">
                                { moment(task.startTime).format('HH:mm') } - { moment(task.endTime).format('HH:mm') }
                            </div>
                        </div>
                    </div>
                ))  
            }
        </div>
    );
}

export default TasksList;