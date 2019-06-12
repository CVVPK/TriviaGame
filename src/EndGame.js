import React from "react";

export default function EndGame({ score, endGameMsg }) {
    return (
        <React.Fragment>
            <div>{endGameMsg}</div> <div>Final Score: {score}</div>
        </React.Fragment>
    );
}
