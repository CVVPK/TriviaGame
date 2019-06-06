import React from "react";
import getQ from "./openTDB";

export const Question = React.createContext();

export default class QuestionProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            question: "",
            correct_answer: "",
            answers: [],
            newQ: this.props.newQ,
            refilling: false
        };
    }
    async populateQuestions() {
        const newQuestions = await getQ(this.props);
        let questions = [...newQuestions, ...this.state.questions];
        this.setState({ questions: questions });
        this.props.startGame();
    }
    refillQuestions() {
        if (!this.state.refilling) {
            this.populateQuestions().then(() =>
                this.setState({ refilling: false })
            );
            this.setState({ refilling: true });
        }
    }
    setQAndA() {
        const {
            question,
            correct_answer,
            incorrect_answers
        } = this.getQuestion();
        const answers = shuffle([correct_answer, ...incorrect_answers]);

        this.setState({
            question: question,
            correct_answer: correct_answer,
            answers: answers
        });
    }
    getQuestion() {
        let questions = this.state.questions;
        let question = questions.pop();

        if (questions.length < 5) {
            this.refillQuestions();
        }

        this.setState({ questions: questions });

        return question;
    }
    componentDidMount() {
        this.populateQuestions().then(() => this.setQAndA());
    }
    componentDidUpdate() {
        if (this.props.newQ !== this.state.newQ) {
            this.setQAndA();
            this.setState({ newQ: !this.state.newQ });
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
