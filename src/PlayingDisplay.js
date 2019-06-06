import React from "react";
import Grid from "@material-ui/core/Grid";
import Score from "./Score";
import Timer from "./Timer";
import timeDifficulty from "./timeDifficulty";
import MoneyTree from "./MoneyTree";

export default function PlayingDisplay({
    state: { score, extraTime, values, current },
    finishGame,
    settings
}) {
    return (
        <React.Fragment>
            <Grid container alignItems="center" direction="column" sm={3}>
                <Score score={score} />

                <Timer
                    timeSettings={timeDifficulty(settings)}
                    extraTime={extraTime}
                    finishGame={finishGame}
                />
            </Grid>
            <Grid sm={3}>
                <MoneyTree values={values} current={current} />
            </Grid>
        </React.Fragment>
    );
}
