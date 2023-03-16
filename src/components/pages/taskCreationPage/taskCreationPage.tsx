import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, TextField, InputLabel, Grid, FormGroup, Checkbox } from '@mui/material';
import { RgbColorPicker } from "react-colorful";
import { Task, TaskType, rgbColor } from 'types';
import { TimePicker, DatePicker } from '@mui/x-date-pickers';
import { addTask, changeTask } from 'redux/reducers/tasks/actionTypes';
import { addNotificationSuccess } from 'redux/reducers/notifications/actionTypes';
import createGUID from 'helpers/createGUID';
import moment from 'moment';
import { dayNames } from 'helpers/helperData';

import './taskCreationPage.scss';

type TaskCreationPageState = {
    title: string,
    desc: string,
    startTime: string | null,
    endTime: string | null,
    taskDate: string | null,
    rgbColor: rgbColor,
    taskType: TaskType,
    taskDays: Array<boolean>
};

const getInitState = () : TaskCreationPageState => {
    // Have it as a function to have proper 'taskDate' on state clear after a day of app working has passed
    return {
        title: '',
        desc: '',
        startTime: null,
        endTime: null,
        taskDate: moment().format('MM/DD/YYYY'),
        rgbColor: {r: 0, g: 0, b: 0},
        taskType: TaskType.Once,
        taskDays: Array(7).fill(false)
    };
}

const TaskCreationPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const tasksPool = useSelector((state: any) => state.app.tasks);
    const [errorList, setErrors] = useState<Array<string>>([]);

    const [pageState, setState] = useState<TaskCreationPageState>(getInitState());
    const { title, desc, startTime, endTime, taskDate, rgbColor, taskType, taskDays } = pageState;

    useEffect(() => {
        // If editing a task - populate state with data
        if(!params.id)
            return;

        const editTask = [...tasksPool.single, ...tasksPool.daily].find((task: Task) => task.id === params.id);
        if(editTask) {
            const taskColor: Array<number> = editTask.color.replace('rgb(', '').replace(')', '').split(',').map((numStr: string) => (
                Number(numStr.trim())
            ));
            setState({
                title: editTask.title,
                desc: editTask.description,
                startTime: editTask.startTime,
                endTime: editTask.endTime,
                taskDate: editTask.date,
                rgbColor: { r: taskColor[0], g: taskColor[1], b: taskColor[2]},
                taskType: editTask.type,
                taskDays: editTask.days
            });
        }
    }, []);

    const changeState = (field: string, value: any) => {
        const newState: any = { ...pageState };
        newState[field] = value;
        setState(newState);
    }

    const timeChangeHandler = (isStartTime: boolean, value: string | null) => {
        if(isStartTime)
            changeState('startTime', value);
        else
            changeState('endTime', value);
    }

    const typeChangeHandler = (e: any) => {
        const value = Number(e.currentTarget.getAttribute('data-value'));
        changeState('taskType', value);
    }

    const dailyChangeHandler = (e: any) => {
        const newDays = [...taskDays];
        newDays[e.target.value - 1] = e.target.checked;
        changeState('taskDays', newDays);
    }

    const validateForm = () : Array<string> => {
        const errList: Array<string> = [];

        // Check if all fields are populated and valid
        if(!title || !startTime || !endTime
            || (taskType === TaskType.Once && !taskDate)
        )
            errList.push('All fields must be populated');

        // Check if time and date fields are valid
        if(!moment(startTime).isValid() || !moment(endTime).isValid() ||
            (taskType === TaskType.Once && !moment(taskDate).isValid())
        )
            errList.push('Entered time or Date is invalid');

        // Check if end time is greater then start time
        if(moment(startTime).isAfter(endTime))
            errList.push('Start Time must come before End Time');

        // TODO: Check if new task interferes with others, form list of tasks and give confirmation popup

        return errList;
    }

    const saveForm = () => {
        const errList = validateForm();
        setErrors(errList);
        if(errList.length != 0)
            return;
        
        const newTask: Task = {
            id: params.id || createGUID(),
            title: title,
            description: desc,
            type: taskType,
            color: `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`,
            startTime: startTime || '',
            endTime: endTime || '',
            days: taskDays,
            date: taskDate || ''
        };
        if(params.id) { // Save edited Task
            dispatch(changeTask( params.id, newTask ));
            dispatch(addNotificationSuccess({ label: `Task Changed`, text: title }));
            navigate(`${process.env.REACT_APP_URL_PREFIX || '/'}tasks`);
        } else { // Create new Task
            dispatch(addTask( newTask ));
            setState({...getInitState()});
            dispatch(addNotificationSuccess({ label: `Task Created`, text: title }));
        }
    }

    return (
        <Container className="task-creation-page d-flex justify-content-center h-100 p-0">
            <div className="p-2 border rounded">
                <TextField id="title" label="Title" variant="outlined" className="mb-3" 
                    value={title} onChange={(e: any) => changeState('title', e.target.value)} />
                <TextField id="description" label="Description" variant="outlined" className="mb-3" fullWidth 
                    value={desc} onChange={(e: any) => changeState('desc', e.target.value)} />

                <InputLabel>Display Color:</InputLabel>
                <RgbColorPicker color={rgbColor} onChange={(val: rgbColor) => changeState('rgbColor', val)} />

                <div className="mt-3">
                    <InputLabel>Task Time:</InputLabel>
                    <div className="mt-2">
                        <TimePicker value={startTime} ampm={false}
                            onChange={(val) => timeChangeHandler(true, val) } 
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker value={endTime} ampm={false}
                            onChange={(val) => timeChangeHandler(false, val) } 
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                </div>

                <div className="type-selector-container my-3">
                    <Grid container className="text-center text-primary">
                        <Grid xs={3} data-value={0} onClick={typeChangeHandler} className={`type-item ${taskType === TaskType.Once ? 'active' : ''}`}>
                            Once
                        </Grid>
                        <Grid xs={3} data-value={1} onClick={typeChangeHandler} className={`type-item ${taskType === TaskType.Daily ? 'active' : ''}`}>
                            Daily
                        </Grid>
                        <Grid xs={3} data-value={2} onClick={typeChangeHandler} className={`type-item ${taskType === TaskType.WeekDays ? 'active' : ''}`}>
                            Week Days
                        </Grid>
                        <Grid xs={3} data-value={3} onClick={typeChangeHandler} className={`type-item ${taskType === TaskType.EveryDay ? 'active' : ''}`}>
                            Every Day
                        </Grid>
                    </Grid>
                </div>

                { taskType === TaskType.Once && 
                    <div>
                        <DatePicker value={taskDate} disablePast
                            onChange={(e: any) => changeState('taskDate', e)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                }

                { taskType === TaskType.Daily && 
                    <FormGroup onChange={dailyChangeHandler}>
                        <div className="d-flex justify-content-between text-center">
                            {
                                dayNames.map((dayName: string) => (
                                    <div className="day-label">{ dayName }</div>
                                ))
                            }
                        </div>
                        <div className="d-flex justify-content-between">
                            <Checkbox value={1} checked={taskDays[0]} />
                            <Checkbox value={2} checked={taskDays[1]} />
                            <Checkbox value={3} checked={taskDays[2]} />
                            <Checkbox value={4} checked={taskDays[3]} />
                            <Checkbox value={5} checked={taskDays[4]} />
                            <Checkbox value={6} checked={taskDays[5]} />
                            <Checkbox value={7} checked={taskDays[6]} />
                        </div>
                    </FormGroup>
                }

                { errorList.length != 0 &&
                    <ul className="text-danger fs-6 mt-3">
                        { errorList.map( (error: string) => (
                            <li>{ error }</li>
                        )) }
                    </ul>
                }

                <div className="buttons-container text-right mt-3">
                    <Button variant="contained" className="me-3" onClick={() => navigate(process.env.REACT_APP_URL_PREFIX || '/')}>Back</Button>
                    <Button variant="contained" onClick={saveForm}>Save</Button>
                </div>
            </div>
        </Container>
    );
}

export default TaskCreationPage;