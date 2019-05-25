import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./Game.js";
import LevelSelect from "./LevelSelect";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            category: 9,
            difficulty: "easy"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange({ target: { value, name } }) {
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        const playSettings = [
            `play`,
            `category=${this.state.category}`,
            `difficulty=${this.state.difficulty}`
        ];
        window.location = playSettings.join("&");
        event.preventDefault();
    }
    render() {
        return (
            <Router>
                <Route
                    path="/"
                    exact
                    render={() => (
                        <LevelSelect
                            onSubmit={this.handleSubmit}
                            onChange={this.handleChange}
                            category={this.state.category}
                            difficulty={this.state.difficulty}
                        />
                    )}
                />
                <Route
                    path="/play&category=:category&difficulty=:difficulty"
                    render={({ match }) => (
                        <Game
                            category={match.params.category}
                            difficulty={match.params.difficulty}
                        />
                    )}
                />
            </Router>
        );
    }
}
