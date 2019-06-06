import React from "react";

export const MyContext = React.createContext();

export default class MyProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 9, // ""
            difficulty: "hard" //""
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
            <MyContext.Provider
                value={{
                    state: this.state,
                    onChange: this.handleChange.bind(this),
                    onClick: this.handleClick.bind(this)
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}
