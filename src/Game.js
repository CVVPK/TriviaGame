import React from "react";
import Question from "./Question.js";
import MoneyTree from "./MoneyTree";
import Score from "./Score";
import Timer from "./Timer";
import EndGame from "./EndGame";
import timeDifficulty from "./timeDifficulty";

// Main Game component
export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            finish: false,
            newQ: false,
            values: [1, 2, 3, 4, 5],
            current: 0,
            score: 0,
            timeSettings: timeDifficulty(this.props),
            extraTime: false
        };
        this.startGame = this.startGame.bind(this);
        this.finishGame = this.finishGame.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(correct) {
        // Levels up, prevents overflow.
        const goUp = ({ current, values }) =>
            current < values.length - 1 ? ++current : values.length - 1;

        // Levels down, prevents <0
        const goDown = ({ current }) => (current > 0 ? --current : 0);

        const newScore = ({ score, values, current }) => {
            score += correct ? values[current] : -values[current];
            return score;
        };
        const newCurrent = (state) => (correct ? goUp(state) : goDown(state));
        const isExtraTime = ({ extraTime }) =>
            correct ? !extraTime : extraTime;

        this.setState({
            current: newCurrent(this.state),
            score: newScore(this.state),
            extraTime: isExtraTime(this.state),
            newQ: !this.state.newQ
        });
    }

    startGame() {
        this.setState({ playing: true });
    }

    finishGame() {
        this.setState({ playing: false, finish: true });
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.finish && (
                    <Question
                        startGame={this.startGame}
                        category={this.props.category}
                        newQ={this.state.newQ}
                        onClick={this.handleClick}
                    />
                )}

                {this.state.playing && (
                    <React.Fragment>
                        <MoneyTree
                            values={this.state.values}
                            current={this.state.current}
                        />
                        <Score score={this.state.score} />
                        <Timer
                            timeSettings={this.state.timeSettings}
                            extraTime={this.state.extraTime}
                            finishGame={this.finishGame}
                        />
                    </React.Fragment>
                )}
                {!this.state.playing && this.state.finish && (
                    <div>
                        <EndGame score={this.state.score} />
                    </div>
                )}
            </React.Fragment>
        );
    }
}
