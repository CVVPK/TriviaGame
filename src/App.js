import React from "react";
import Game from "./Game.js";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            category: 9,
            difficulty: "easy"
        };
    }
    render() {
        return (
            <Game
                category={this.state.category}
                difficulty={this.state.difficulty}
            />
        );
    }
}

export default App;
