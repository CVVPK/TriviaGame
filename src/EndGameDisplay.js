import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function EndGameDisplay({ score, endGameMsg }) {
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography variant="h1" color="textPrimary">
                {endGameMsg}
            </Typography>
            <Typography variant="h2" color="textSecondary">
                Final Score: {score}
            </Typography>
        </Grid>
    );
}
