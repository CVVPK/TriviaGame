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
                        <Answer
                            answer={answer}
                            onClick={onClick}
                            correct_answer={correct_answer}
                        />
                    ))
                }
            </Question.Consumer>
        </Grid>
    );
}

function Answer({ answer, onClick, correct_answer }) {
    return (
        <Grid item xs={5} key={answer}>
            <Button
                fullWidth
                style={answerStyle}
                variant="contained"
                color="primary"
                onClick={() => onClick(answer === correct_answer)}
            >
                <Typography variant="h6">
                    <span dangerouslySetInnerHTML={{ __html: answer }} />
                </Typography>
            </Button>
        </Grid>
    );
}

const answerStyle = {
    padding: "5%",
    height: "100%"
};
