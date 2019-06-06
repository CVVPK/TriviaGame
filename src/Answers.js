import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Question } from "./QuestionProvider";

export default function Answers() {
    const classes = useStyles();

    return (
        <Question.Consumer>
            {({ state: { answers, correct_answer }, onClick }) =>
                answers.map((answer) => (
                    <Button
                        fullWidth
                        key={answer}
                        className={classes.answer}
                        variant="contained"
                        color="primary"
                        onClick={() => onClick(answer === correct_answer)}
                    >
                        <AnswerDisplay answer={answer} />
                    </Button>
                ))
            }
        </Question.Consumer>
    );
}

function AnswerDisplay({ answer }) {
    return <span dangerouslySetInnerHTML={{ __html: answer }} />;
}

const useStyles = makeStyles((theme) => ({
    answer: {
        margin: theme.spacing(1)
    },
    question: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));
