import { FunctionComponent, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { calcTasks } from 'redux/reducers/dayTasks/actionTypes';
import renderClockCanvas from './clockRender';

const baseSize = 400;
const basePadding = 50;

const Clock: FunctionComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const storeDayTasks = useSelector((state: any) => state.app.dayTasks);
    const dispatch = useDispatch();

    const [sizeMult, setSizeMult] = useState<number>(1);
    const [clockSize, setClockSize] = useState<number>(baseSize * sizeMult);
    const [clockPadding, setClockPadding] = useState<number>(basePadding * sizeMult);
    const [totalSize, setTotalSize] = useState<number>(clockSize + clockPadding);
    const clockColor = 'rgba(0,0,0,.2)';
    const clockColorShade = 'black';

    const radius = clockSize / 2;
    const center = totalSize / 2;

    useEffect(() => {
        const newSize = baseSize * sizeMult;
        const newPadding = basePadding * sizeMult;
        setClockSize(newSize);
        setClockPadding(newPadding);
        setTotalSize(newSize + newPadding);
    }, [sizeMult]);

    useEffect(() => {
        handleCanvas();
    }, [totalSize]);

    useEffect(() => { 
        // Update day tasks when Clock is opened
        dispatch(calcTasks());
    }, []);

    useEffect(() => { 
        // Update canvas every second for hand and tasks redraw
        // TODO: Change this to Tiemout and cal time to minute change insted of rerendering every second
        let curDay = moment().day();
        const clockInterval = setInterval(() => {
            handleCanvas();
            if(
                moment().day() != curDay || // Recalc if day changed
                (storeDayTasks.curTask && moment().isAfter(storeDayTasks.curTask.endTime)) // Recalc if day ended to update current task
            ) {
                curDay = moment().day();
                dispatch(calcTasks());
            }
        }, 1000);
        return () => {
            clearInterval(clockInterval);
        }
    }, [storeDayTasks]);

    const handleCanvas = () => {
        const ctx: CanvasRenderingContext2D | null | undefined = canvasRef.current?.getContext("2d");
        if(!ctx)
            return;
        ctx.canvas.width = totalSize;
        ctx.canvas.height = totalSize;

        renderClockCanvas({ ctx, totalSize, center, radius, clockColor, clockColorShade, storeDayTasks });
    }

    return (
        <div>
            <canvas ref={canvasRef} width={totalSize} height={totalSize} 
                onClick={() => setSizeMult( sizeMult + .5 )} />
        </div>
    );
}

export default Clock;