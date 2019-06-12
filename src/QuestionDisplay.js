import React from "react";
import { Question } from "./QuestionProvider";

export default function QuestionDisplay() {
    return (
        <Question.Consumer>
            {({ state: { question } }) => (
                <div
                    style={questionStyle}
                    dangerouslySetInnerHTML={{ __html: question }}
                />
            )}
        </Question.Consumer>
    );
}

const questionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    textAlign: "center",
    fontSize: "2rem"
};
