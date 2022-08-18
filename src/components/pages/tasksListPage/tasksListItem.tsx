import { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeTask } from 'redux/reducers/tasks/actionTypes';
import { Task, TaskType } from 'types';
import { Collapse } from '@mui/material';
import { AiFillCaretDown, AiFillCaretUp, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import moment from 'moment';
import { dayNames } from 'helpers/helperData';

type TasksListItemProps = {
    task: Task,
    backgroundColor: string
}

const iconSize: number = 20;

const TasksListItem: FunctionComponent<TasksListItemProps> = ({ task, backgroundColor }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState<boolean>(false);

    const deleteTask = () => {
        // TODO: Add proper qustion popup
        if(window.confirm('Delete task?'))
            dispatch( removeTask(task.id) );
    }

    const getDatesData = () : string => {
        switch(task.type) {
            case TaskType.Once:
                return moment(task.date).format('MM/DD/YYYY');
            case TaskType.Daily:
                const days: Array<string> = [];
                dayNames.forEach((dayName: string, index: number) => {
                    if(task.days[index])
                        days.push(dayName);
                });
                return days.join(' | ');
            case TaskType.WeekDays:
                return 'Only Week Days';
            case TaskType.EveryDay:
                return 'Every Day';
        }
    }

    return (
        <div className="task-list-item rounded border p-2 my-2" style={{ backgroundColor: backgroundColor }}>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <span className="color-sphere d-inline-block me-2" style={{ backgroundColor: task.color }} />
                    <div>
                        <span>
                            <span className="fw-bold">{ task.title }</span> - { getDatesData() }
                        </span>
                        <div className="item-time fw-bold">
                            { moment(task.startTime).format('HH:mm') } - { moment(task.endTime).format('HH:mm') }
                        </div>
                    </div>
                </div>

                <div className="buttons-row">
                    <AiFillEdit size={iconSize} className="c-pointer" 
                        onClick={() => navigate(`process.env.REACT_APP_URL_PREFIX || '/'edit/${task.id}`)} />
                    <AiFillDelete size={iconSize} className="c-pointer mx-2" onClick={deleteTask} />

                    { task.description &&
                        <span className="c-pointer" onClick={() => setOpen(!isOpen)}>
                            { isOpen ? <AiFillCaretUp /> : <AiFillCaretDown /> }
                        </span>
                    }
                </div>
            </div>

            <Collapse in={isOpen}>{ task.description }</Collapse>
        </div>
    );
}

export default TasksListItem;