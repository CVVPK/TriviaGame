import React from "react";

export const Settings = React.createContext();

// Defines the game settings state and functionality to change them.
export default class SettingsProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: JSON.stringify({ id: 9, name: "General Knowledge" }),
            difficulty: "easy"
        };
    }
    handleChange({ target: { value, name } }) {
        this.setState({ [name]: value });
    }
    handleClick(event) {
        if (this.state.category === "" || this.state.difficulty === "")
            alert("Set difficulty and category");
        else this.setState(this.props.setDisplayGame(true));
    }
    render() {
        return (
            <Settings.Provider
                value={{
                    state: this.state,
                    categoryId: JSON.parse(this.state.category).id,
                    categoryName: JSON.parse(this.state.category).name,
                    difficulty: this.state.difficulty,
                    onChange: this.handleChange.bind(this),
                    onClick: this.handleClick.bind(this)
                }}
            >
                {this.props.children}
            </Settings.Provider>
        );
    }
}
