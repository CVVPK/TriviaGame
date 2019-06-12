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
            values: [100, 200, 300, 400, 500],
            current: 0,
            score: 0,
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
            // score += correct ? values[current] : -values[current];
            score += correct ? 1 : 0;
            return score;
        };
        const newCurrent = (state) => (correct ? goUp(state) : goDown(state));
        const isExtraTime = ({ extraTime }) =>
            correct ? !extraTime : extraTime;

        this.setState({
            // current: newCurrent(this.state),
            score: newScore(this.state),
            extraTime: isExtraTime(this.state),
            newQ: !this.state.newQ
        });
    }

    startGame() {
        this.setState({ playing: true });
    }

    finishGame() {
        // this.setState({ playing: false, finish: true });
    }

    render() {
        return (
            <Grid container>
                {!this.state.finish && (
                    <Settings.Consumer>
                        {({ state: { category, difficulty, catName } }) => (
                            <QuestionProvider
                                startGame={this.startGame}
                                category={category}
                                newQ={this.state.newQ}
                                onClick={this.handleClick}
                            >
                                <PlayingDisplay
                                    state={this.state}
                                    catName={catName}
                                    difficulty={difficulty}
                                    finishGame={this.finishGame}
                                />
                            </QuestionProvider>
                        )}
                    </Settings.Consumer>
                )}
                {!this.state.playing && this.state.finish && (
                    <div>
                        <EndGame score={this.state.score} />
                    </div>
                )}
            </Grid>
        );
    }
}
