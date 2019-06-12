import React from "react";

export const Settings = React.createContext();

export default class SettingsProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // catName: "",
            category: 9, // ""
            difficulty: "hard" //""
        };
    }
    handleChange({ target: { value, name } }) {
        // console.log(typeof value);
        // if (Array.isArray(value)) console.log("ye");
        // this.setState({ [name]: value[0], catName: value[1] });

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
                    onChange: this.handleChange.bind(this),
                    onClick: this.handleClick.bind(this)
                }}
            >
                {this.props.children}
            </Settings.Provider>
        );
    }
}
