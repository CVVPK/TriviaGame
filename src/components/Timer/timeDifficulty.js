// Returns a TimeSettings object corresponding to  difficulty
export default function timeDifficulty(difficulty) {
    let time = {
        easy: new TimeSettings(30, 10),
        medium: new TimeSettings(20, 5),
        hard: new TimeSettings(10, 2),
        ultimate: new TimeSettings(5, 1)
    };

    return time[difficulty];
}

function TimeSettings(initTime, initExtra) {
    this.initTime = initTime;
    this.initExtra = initExtra;
}
