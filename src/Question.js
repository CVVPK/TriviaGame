import React from "react";

export default function Question({ question, incorrect, onClick, correct }) {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: question }} />
            <Answers
                incorrect={incorrect}
                onClick={onClick}
                correct={correct}
            />
        </div>
    );
}

function Answers({ incorrect, correct, onClick }) {
    const shuffle = (arr) => {
        let copy = arr;
        for (let i = copy.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[rand]] = [copy[rand], copy[i]];
        }
        return copy;
    };

    const answers = shuffle([correct, ...incorrect]);

    return answers.map((answer) => (
        <button
            key={answer}
            onClick={() => onClick(answer === correct)}
            dangerouslySetInnerHTML={{ __html: answer }}
        />
    ));
}
