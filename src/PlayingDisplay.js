import React from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Score from "./Score";
import Timer from "./Timer";
import timeDifficulty from "./timeDifficulty";
import QuestionDisplay from "./QuestionDisplay";
import AnswersDisplay from "./AnswersDisplay";
import { Typography } from "@material-ui/core";

export default function PlayingDisplay({
    state: { score, extraTime, playing },
    finishGame,
    difficulty
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
                        <Typography variant="h4">
                            <Score score={score} />
                        </Typography>
                        <Typography variant="h4">
                            <Timer
                                timeSettings={timeDifficulty(difficulty)}
                                extraTime={extraTime}
                                finishGame={finishGame}
                            />
                        </Typography>
                    </Grid>

                    <QuestionDisplay />
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
