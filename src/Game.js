import React from "react";
import Grid from "@material-ui/core/Grid";
import QuestionProvider from "./QuestionProvider.js";
import EndGameDisplay from "./EndGameDisplay";
import { Settings } from "./SettingsProvider";
import PlayingDisplay from "./PlayingDisplay.js";
import PauseOverlay from "./PauseOverlay";

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
        return (
            <Grid container>
                {this.state.pause && <PauseOverlay />}
                {!this.state.finish && (
                    <Settings.Consumer>
                        {({ state: { category, difficulty } }) => (
                            <QuestionProvider
                                startGame={this.startGame}
                                finishGame={this.finishGame}
                                category={category}
                                newQ={this.state.newQ}
                                onClick={this.handleClick}
                                pauseGame={this.pauseGame}
                                resumeGame={this.resumeGame}
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
                    <EndGameDisplay
                        score={this.state.score}
                        endGameMsg={this.state.endGameMsg}
                    />
                )}
            </Grid>
        );
    }
}
