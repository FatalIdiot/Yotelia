import { FunctionComponent, useState } from 'react';
import { Task } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { checkTask } from 'redux/reducers/cancelledTasks/actionTypes';
import moment from 'moment';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import './tasksList.scss';

type TasksListProps = {
    tasks: Array<Task>,
    curTaskId: string
}

const TasksList: FunctionComponent<TasksListProps> = ({ tasks, curTaskId }) => {
    const dispatch = useDispatch();

    const cancelledTasks = useSelector((state: any) => state.app.cancelledTasks);
    const [mobileTasksOpen, setTasksOpen] = useState<boolean>(false);

    const renderColorSphere = (color: string) => {
        return (
            <div className="color-sphere d-inline-block me-3" style={{ backgroundColor: color }} />
        );
    }

    return (
        <>
            <span className='tasks-list-collapse c-pointer d-md-none' onClick={() => setTasksOpen(!mobileTasksOpen)}>
                { mobileTasksOpen ? <CloseIcon /> : <MenuIcon /> }
            </span>

            <div className={`tasks-list p-2 ${mobileTasksOpen ? 'mobile-open' : ''}`}>
                { 
                    tasks.map((task: Task) => (
                        <div className={`task-item d-flex align-items-center c-pointer my-2 ${cancelledTasks.indexOf(task.id) !== -1 ? 'cancelled' : ''}`} 
                            onClick={() => dispatch(checkTask(task.id))} key={task.id}
                        >
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
        </>
    );
}

export default TasksList;