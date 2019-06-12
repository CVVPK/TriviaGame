import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Question } from "./QuestionProvider";
import Typography from "@material-ui/core/Typography";

export default function AnswersDisplay() {
    return (
        <Grid
            container
            justify="space-evenly"
            alignItems="stretch"
            alignContent="flex-end"
            spacing={1}
        >
            <Question.Consumer>
                {({ state: { answers, correct_answer }, onClick }) =>
                    answers.map((answer) => (
                        <Grid item xs={5} key={answer}>
                            <Button
                                fullWidth
                                style={answerStyle}
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    onClick(answer === correct_answer)
                                }
                            >
                                <Answer answer={answer} />
                            </Button>
                        </Grid>
                    ))
                }
            </Question.Consumer>
        </Grid>
    );
}

function Answer({ answer }) {
    return (
        <Typography variant="h6">
            <span dangerouslySetInnerHTML={{ __html: answer }} />
        </Typography>
    );
}

const answerStyle = {
    padding: "5%",
    // fontSize: "1.2rem",
    height: "100%"
};
