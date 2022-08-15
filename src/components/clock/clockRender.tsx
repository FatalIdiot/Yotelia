import { Task, DayTasksData } from 'types';
import moment from 'moment';

export type ClockRenderData = {
    ctx: CanvasRenderingContext2D,
    totalSize: number,
    center: number,
    radius: number,
    clockColor: string,
    clockColorShade: string,
    storeDayTasks: DayTasksData
}

function renderClockCanvas(renderData: ClockRenderData) {
    drawClockBase(renderData);
    drawClockTasks(renderData);
    drawClockPost(renderData);
}

const drawClockBase = (renderData: ClockRenderData) => {
    const { ctx, totalSize, center, radius, clockColor, clockColorShade, storeDayTasks } = renderData;

    ctx.clearRect(0, 0, totalSize, totalSize);

    // Draw shape
    ctx.beginPath();
    ctx.arc(
        center, center, 
        radius,
        0, 2 * Math.PI
    );
    ctx.fillStyle = clockColor;
    ctx.fill();
}

const drawClockTasks = (renderData: ClockRenderData) => {
    const { ctx, totalSize, center, radius, clockColor, clockColorShade, storeDayTasks } = renderData;

    storeDayTasks.dayTasks.forEach((taskData: Task) => {
        const task = {
            startHour: Number( moment(taskData.startTime).format('HH') ),
            endHour: Number( moment(taskData.endTime).format('HH') ),
            startMin: Number( moment(taskData.startTime).format('mm') ),
            endMin: Number( moment(taskData.endTime).format('mm') ),
            color: taskData.color
        };

        // If task end the next day - add hours to correctly represent (for future use)
        if(task.endHour < task.startHour)
            task.endHour += 24;

        ctx.beginPath();
        ctx.moveTo(center, center);

        const oneHourAng = (2 * Math.PI) / 24;
        const startAng = (task.startHour * (2 * Math.PI) / 24) 
            + oneHourAng * (task.startMin / 60)
            + Math.PI * 1.5;
        const endAng = (task.endHour * (2 * Math.PI) / 24) 
            + oneHourAng * (task.endMin / 60)
            + Math.PI * 1.5;

        const midPoints = [];
        for(let i = task.startHour + 1; i < task.endHour; i++) {
            const midAng = (i * (2 * Math.PI) / 24)
                + Math.PI * 1.5;
            midPoints.push({
                x: (Math.cos(midAng) * radius + totalSize / 2), 
                y: (Math.sin(midAng) * radius + totalSize / 2)
            });
        }

        const startVec = { 
            x: (Math.cos(startAng) * radius + totalSize / 2), 
            y: (Math.sin(startAng) * radius + totalSize / 2)
        };
        const endVec = { 
            x: (Math.cos(endAng) * radius + totalSize / 2), 
            y: (Math.sin(endAng) * radius + totalSize / 2)
        };

        ctx.quadraticCurveTo(startVec.x, startVec.y, startVec.x, startVec.y);
        midPoints.forEach(point => {
            ctx.quadraticCurveTo(point.x, point.y, point.x, point.y);
        });
        ctx.quadraticCurveTo(endVec.x, endVec.y, endVec.x, endVec.y);

        ctx.strokeStyle = 'rgba(0,0,0,0)';
        ctx.fillStyle = task.color;
        ctx.fill();
        ctx.closePath();
    });
}

const drawClockPost = (renderData: ClockRenderData) => {
    const { ctx, totalSize, center, radius, clockColor, clockColorShade, storeDayTasks } = renderData;
    
    ctx.beginPath();
    ctx.fillStyle = clockColorShade;
    ctx.strokeStyle = clockColorShade;
    ctx.font = `${radius * 0.15}px ComicSense`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.lineWidth = 4;
    const displayNums = [3, 6, 9, 12, 15, 18, 21, 24];
    const lineHeight = 15;
    const lineRadius = radius * 0.9;

    for(let num = 1; num < 25; num++) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        let ang = num * (2 * Math.PI) / 24;

        if(displayNums.indexOf(num) === -1) { // Draw line
            const dirs = {
                xStart: Math.cos(ang) * lineRadius + totalSize / 2,
                yStart: Math.sin(ang) * lineRadius + totalSize / 2,
                xEnd: Math.cos(ang) * lineRadius + totalSize / 2 - Math.cos(ang) * lineHeight,
                yEnd: Math.sin(ang) * lineRadius + totalSize / 2 - Math.sin(ang) * lineHeight,
            }
            ctx.moveTo(dirs.xEnd, dirs.yEnd);
            ctx.lineTo(dirs.xStart, dirs.yStart);
            ctx.stroke();
        } else { // Draw number
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), center, center + 3);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-ang);
        }
    }
    ctx.closePath();

    // Draw clock hand
    ctx.beginPath();
    ctx.lineWidth = 2;
    const handLength = radius * 0.9;
    let handAng = (moment().hour() * (2 * Math.PI) / 24) - Math.PI / 2; // cals ang base on hours
    const oneHourAng = (2 * Math.PI) / 24;
    handAng += oneHourAng * (moment().minutes() / 60); // add angle for minutes
    ctx.moveTo(center, center);
    ctx.lineTo(Math.cos(handAng) * handLength + totalSize / 2, Math.sin(handAng) * handLength + totalSize / 2);
    ctx.stroke();
    ctx.closePath();

    // Draw side
    ctx.beginPath();
    const grad = ctx.createRadialGradient(center, center, radius * 0.95, center, center, radius * 1.05);
    grad.addColorStop(0, clockColorShade);
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, clockColorShade);
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.arc(
        center, center, 
        radius,
        0, 2 * Math.PI
    );
    ctx.stroke();
    ctx.closePath();

    // Draw center
    ctx.fillStyle = clockColorShade;
    ctx.beginPath();
    ctx.arc(center, center, 5, 0, 2 * Math.PI);
    ctx.fill();
}

export default renderClockCanvas;