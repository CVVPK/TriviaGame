import React from "react";
import Grid from "@material-ui/core/Grid";
import QuestionProvider from "./QuestionProvider.js";
import EndGame from "./EndGame";
import { Settings } from "./SettingsProvider";
import PlayingDisplay from "./PlayingDisplay.js";

// Main Game component
export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            finish: false,
            newQ: false,
            score: 0,
            extraTime: false,
            endGameMsg: ""
        };
        this.startGame = this.startGame.bind(this);
        this.finishGame = this.finishGame.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    startGame() {
        this.setState({ playing: true });
    }

    finishGame(msg) {
        this.setState({ playing: false, finish: true, endGameMsg: msg });
    }

    render() {
        return (
            <Grid container>
                {!this.state.finish && (
                    <Settings.Consumer>
                        {({ state: { category, difficulty } }) => (
                            <QuestionProvider
                                startGame={this.startGame}
                                finishGame={this.finishGame}
                                category={category}
                                newQ={this.state.newQ}
                                onClick={this.handleClick}
                            >
                                <PlayingDisplay
                                    state={this.state}
                                    difficulty={difficulty}
                                    finishGame={this.finishGame}
                                />
                            </QuestionProvider>
                        )}
                    </Settings.Consumer>
                )}
                {!this.state.playing && this.state.finish && (
                    <EndGame
                        score={this.state.score}
                        endGameMsg={this.state.endGameMsg}
                    />
                )}
            </Grid>
        );
    }
}
