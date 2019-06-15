import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Component to display a pause overlay that covers entire screen.
export default function PauseOverlay() {
    return (
        <Grid
            container
            justify="space-between"
            direction="column"
            style={pauseStyle}
        >
            <Typography
                variant="h1"
                align="center"
                color="primary"
                style={pauseText}
            >
                Getting More Questions
            </Typography>
            <LinearProgress variant="query" />
        </Grid>
    );
}

const pauseText = {
    marginTop: "25%"
};
const pauseStyle = {
    zIndex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.9,
    backgroundColor: "black"
};
