import React from "react";
import Question from "./Question.js";
import MoneyTree from "./MoneyTree";
import Score from "./Score";
import Timer from "./Timer";
// import getQ from "./openTDB.js";
import EndGame from "./EndGame";
import { easyBank } from "./questionBanks";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            finish: false,
            // questions: new QuestionBank(9, "easy"),
            question: {
                question: "",
                correct_answer: "",
                incorrect_answers: []
            },
            values: [1, 2, 3, 4, 5],
            current: 0,
            score: 0,
            initTime: 200,
            initExtra: 5,
            extraTime: false
        };
    }

    handleClick(correct) {
        const goUp = () => {
            let current = this.state.current;
            return current < this.state.values.length - 1
                ? ++current
                : this.state.values.length - 1;
        };
        const goDown = () => {
            let current = this.state.current;
            return current > 0 ? --current : 0;
        };
        const newScore = () => {
            let { score, values, current } = this.state;
            score += correct ? values[current] : -values[current];
            return score;
        };
        this.updateQuestion();
        this.setState({
            current: correct ? goUp() : goDown(),
            score: newScore(),
            extraTime: correct ? !this.state.extraTime : this.state.extraTime
        });
    }
    async updateQuestion() {
        let questions = await easyBank;
        const question = questions.randomQ;
        return this.setState({ question: question });
    }
    componentDidMount() {
        this.updateQuestion().then(() => this.setState({ playing: true }));
    }

    finishGame() {
        this.setState({ playing: false, finish: true });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.playing && (
                    <div>
                        <Question
                            question={this.state.question.question}
                            incorrect={this.state.question.incorrect_answers}
                            correct={this.state.question.correct_answer}
                            onClick={(correct) => this.handleClick(correct)}
                        />

                        <MoneyTree
                            values={this.state.values}
                            current={this.state.current}
                        />
                        <Score score={this.state.score} />
                        <Timer
                            initTime={this.state.initTime}
                            initExtra={this.state.initExtra}
                            extraTime={this.state.extraTime}
                            finishGame={() => this.finishGame()}
                        />
                    </div>
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

export default Game;
