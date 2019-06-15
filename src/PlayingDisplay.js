import React from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Score from "./Score";
import Timer from "./Timer";
import timeDifficulty from "./timeDifficulty";
import QuestionDisplay from "./QuestionDisplay";
import AnswersDisplay from "./AnswersDisplay";
import { Typography } from "@material-ui/core";

// Compononent to display the playing screen, displays a loading screen while waiting on game to begin.
export default function PlayingDisplay({
    state: { score, extraTime, playing, pause },
    finishGame,
    difficulty,
    categoryName
}) {
    if (playing)
        return (
            <React.Fragment>
                <Grid
                    container
                    alignContent="flex-start"
                    justify="space-between"
                    direction="column"
                >
                    <Grid container justify="space-between">
                        <Typography variant="h5">
                            <Score score={score} />
                        </Typography>

                        <Typography variant="h5">
                            <Timer
                                timeSettings={timeDifficulty(difficulty)}
                                extraTime={extraTime}
                                finishGame={finishGame}
                                pause={pause}
                            />
                        </Typography>
                    </Grid>
                    <Grid container justify="space-between">
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            justify="center"
                        >
                            Category: {categoryName}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            justify="center"
                        >
                            Difficulty: {capitalize(difficulty)}
                        </Typography>
                    </Grid>

                    <QuestionDisplay style={questionStyle} />
                </Grid>
                <AnswersDisplay />
            </React.Fragment>
        );
    else
        return (
            <Grid
                container
                justify="center"
                direction="column"
                alignItems="center"
            >
                <CircularProgress size={100} thickness={5} />
            </Grid>
        );
}

const capitalize = (str) =>
    str.replace(/^(\w)(.*)/, (match, p1, p2) => p1.toUpperCase() + p2);

const questionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    textAlign: "center",
    fontSize: "2rem"
};
