import React from "react";
import getQ from "./openTDB";

export const Question = React.createContext();

// Defines the question state and functionality
export default class QuestionProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            question: "",
            correct_answer: "",
            answers: [],
            newQ: this.props.newQ,
            refilling: false,
            refillPromise: undefined
        };
        this.setQAndA = this.setQAndA.bind(this);
        this.populateQuestions = this.populateQuestions();
    }

    // Allows this.state.questions to be populated.
    populateQuestions(maxAmount = 50) {
        let amount = maxAmount;

        return async () => {
            do {
                try {
                    const newQuestions = await getQ(this.props, amount);
                    let questions = [...newQuestions, ...this.state.questions];
                    this.setState({ questions: questions });
                    return;
                } catch (response_code) {
                    if (response_code === 4 && amount >= 2) {
                        amount = Math.floor(amount / 2);
                    }
                }
            } while (amount > 2);
            throw Error("No more Questions!");
        };
    }

    // Allows refilling of this.state.questions
    refillQuestions() {
        if (!this.state.refilling) {
            const refillPromise = new Promise((resolve, reject) => {
                this.populateQuestions()
                    .then(() => {
                        this.setState({ refilling: false });
                        resolve();
                    })
                    .catch((error) => reject(error.message));
            });

            this.setState({ refilling: true, refillPromise: refillPromise });
        }
    }

    // Allows requesting a single question from this.state.questions
    get question() {
        let questions = this.state.questions;
        let question = questions.pop();

        if (questions.length < 10) {
            this.refillQuestions();
        }
        if (question === undefined) {
            throw Error("Refilling");
        } else this.setState({ questions: questions });

        return question;
    }

    // Sets the current Question and Answers.
    setQAndA() {
        try {
            const {
                question,
                correct_answer,
                incorrect_answers
            } = this.question;
            const answers = shuffle([correct_answer, ...incorrect_answers]);

            this.setState({
                question: question,
                correct_answer: correct_answer,
                answers: answers
            });
        } catch (error) {
            // Pause the game until the questions have been refilled.
            if (error.message === "Refilling") {
                this.props.pauseGame();
                this.state.refillPromise
                    .then(() => {
                        this.setQAndA();
                        this.props.resumeGame();
                    })
                    .catch((error) => {
                        this.props.resumeGame();
                        this.props.finishGame(error);
                    });
            } else throw error;
        }
    }

    // Set initial Question and Answer and start game
    componentDidMount() {
        this.populateQuestions().then(() => {
            this.setQAndA();
            this.props.startGame();
        });
    }

    // Check if the game needs to change question on update.
    componentDidUpdate() {
        if (this.props.newQ !== this.state.newQ) {
            this.setState({ newQ: !this.state.newQ });
            this.setQAndA();
        }
    }

    render() {
        return (
            <Question.Provider
                value={{
                    state: this.state,
                    onClick: this.props.onClick
                }}
            >
                {this.props.children}
            </Question.Provider>
        );
    }
}

const shuffle = (arr) => {
    let copy = arr;
    for (let i = copy.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[rand]] = [copy[rand], copy[i]];
    }
    return copy;
};
