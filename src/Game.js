import React from "react";
import GameDisplay from "./GameDisplay.js";

// Provides game controls and state
export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            finish: false,
            newQ: false,
            score: 0,
            extraTime: false,
            endGameMsg: "",
            pause: false
        };

        this.startGame = this.startGame.bind(this);
        this.finishGame = this.finishGame.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.pauseGame = this.pauseGame.bind(this);
        this.resumeGame = this.resumeGame.bind(this);
    }

    handleClick(correct) {
        const newScore = ({ score }) => {
            score += correct ? 1 : 0;
            return score;
        };
        const isExtraTime = ({ extraTime }) =>
            correct ? !extraTime : extraTime;

        this.setState({
            score: newScore(this.state),
            extraTime: isExtraTime(this.state),
            newQ: !this.state.newQ
        });
    }
    pauseGame() {
        this.setState({ pause: true });
    }
    resumeGame() {
        this.setState({ pause: false });
    }
    startGame() {
        this.setState({ playing: true });
    }

    finishGame(msg) {
        this.setState({ playing: false, finish: true, endGameMsg: msg });
    }

    render() {
        return <GameDisplay props={this} />;
    }
}
