import React from "react";
import { Question } from "./QuestionProvider";
import { makeStyles } from "@material-ui/core/styles";

export default function QuestionDisplay() {
    const classes = useStyles();

    return (
        <Question.Consumer>
            {({ state: { question } }) => (
                <div
                    className={classes.question}
                    dangerouslySetInnerHTML={{ __html: question }}
                />
            )}
        </Question.Consumer>
    );
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
