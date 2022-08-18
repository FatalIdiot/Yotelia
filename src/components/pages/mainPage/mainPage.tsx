import { FunctionComponent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { Task, TaskText } from 'types';
import { genTaskText } from 'helpers/textGenerator';
import { sortTasksByTime } from 'helpers/helperData';

import Clock from 'components/clock/clock';
import TasksList from './tasksList/tasksList';

const MainPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const curTask: Task | null = useSelector((state: any) => (state.app.dayTasks.curTask));
    const dayTasks: Array<Task> = useSelector((state: any) => (state.app.dayTasks.dayTasks));
    
    const calcTaskText = () : TaskText => {
        return curTask ? {
            title: curTask.title, 
            description: curTask.description
        } : genTaskText();
    }

    const [taskText, setTaskText] = useState<TaskText>(calcTaskText());
    useEffect(() => {
        setTaskText(calcTaskText());
    }, [curTask]);

    return (
        <Box className="main-page d-flex justify-content-center align-items-center h-100">
            <h2 className="app-title position-absolute mt-3 ms-3" style={{ top: 0, left: 0, opacity: .2 }}>
                Yotelia Planner
            </h2>

            <div>
                <div className="text-center">
                    <h2>{ taskText.title }</h2>
                    <span>{ taskText.description }</span>
                </div>

                <Clock />

                <div className="buttons-container text-center mt-3">
                    <Button variant="contained" onClick={() => navigate(`${process.env.REACT_APP_URL_PREFIX || '/'}new`)} className="me-3">
                        Add Task
                    </Button>
                    <Button variant="contained" onClick={() => navigate(`${process.env.REACT_APP_URL_PREFIX || '/'}tasks`)}>Manage Tasks</Button>
                </div>
            </div>

            <TasksList tasks={dayTasks.sort(sortTasksByTime)} curTaskId={curTask?.id || ''} />
        </Box>
    );
}

export default MainPage;