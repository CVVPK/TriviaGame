import React from "react";
import { Question } from "./QuestionProvider";

// Component to display a Single Question.
export default function QuestionDisplay({ style }) {
    return (
        <Question.Consumer>
            {({ state: { question } }) => (
                <div
                    style={style}
                    dangerouslySetInnerHTML={{ __html: question }}
                />
            )}
        </Question.Consumer>
    );
}
