import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Task, TasksPool, TaskType } from 'types';
import { clearAll } from 'redux/reducers/tasks/actionTypes';
import { AiFillLeftCircle, AiOutlineClear } from 'react-icons/ai';
import { sortTasksByTime, sortTasksByType } from 'helpers/helperData';

import TasksListItem from './tasksListItem';

import './tasksListPage.scss';

const typeColors = {
    [TaskType.Once]: 'lightgray',
    [TaskType.Daily]: 'lightyellow',
    [TaskType.WeekDays]: 'lightskyblue',
    [TaskType.EveryDay]: 'palegreen'
}

const TasksListPage: FunctionComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTitle, setSearch] = useState<string>('');
    const dayTasks: TasksPool = useSelector((state: any) => (state.app.tasks));

    const pullTasks = () => {
        return [...dayTasks.daily, ...dayTasks.single].sort(sortTasksByTime).sort(sortTasksByType);
    }

    const [tasks, setTasks] = useState(pullTasks());
    useEffect(() => {
        setTasks(pullTasks());
    }, [dayTasks]);

    return (
        <Box className="task-list-page">
            <div className="task-list-header d-flex justify-content-between align-items-center p-2">
                <AiFillLeftCircle className="c-pointer" size={25} onClick={() => navigate(process.env.REACT_APP_URL_PREFIX || '/')} />

                <div>
                    <TextField className="search-field"
                        value={searchTitle}
                        onChange={(e) => setSearch(e.target.value)}
                        label="Search field"
                        type="search"
                    />
                </div>

                <div>
                    <AiOutlineClear title="Clear all tasks" className="c-pointer" size={25} onClick={() => dispatch(clearAll())} />
                </div>
            </div>

            { tasks.length > 0 ?
                tasks.filter((task: Task) => (task.title.indexOf(searchTitle) !== -1))
                    .map((task: Task) => (
                    <TasksListItem task={task} backgroundColor={typeColors[task.type]} />
                ))
            :
                <h4 className="text-center mt-3">There Are No Tasks</h4>
            }
        </Box>
    );
}

export default TasksListPage;