import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Question } from "./QuestionProvider";
import Typography from "@material-ui/core/Typography";

// Component to display the possible answers to a question
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
                            key={answer}
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

// Componenent to display a single answer
function Answer({ answer, onClick, correct_answer }) {
    return (
        <Grid item xs={5}>
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
