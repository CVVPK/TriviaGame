import TimeSettings from "./TimeSettings.js";

// Returns a TimeSettings object corresponding to  difficulty
export default function timeDifficulty(difficulty) {
    let time = {
        easy: new TimeSettings(30, 10),
        normal: new TimeSettings(20, 5),
        hard: new TimeSettings(10, 2)
    };

    return time[difficulty];
}
