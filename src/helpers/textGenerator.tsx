import { TaskText } from 'types';

export function genTaskText() : TaskText {
    const titlesPool: Array<string> = [
        'No Task for Now',
        'Nothing to Do',
        'Chilling Time',
        'Relax',
        'Nothing to Worry About'
    ];
    const descPool: Array<string> = [
        'Enjoy some free time',
        'About time to have some fun',
        'Chilling never killed anyone',
        'Might go for a walk or something...'
    ];
    
    return {
        title: getRandomEl(titlesPool),
        description: getRandomEl(descPool)
    };
}

function getRandomEl(array: Array<any>) {
    return array[Math.floor(Math.random() * array.length)];
}