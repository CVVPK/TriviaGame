import React from "react";

export const MyContext = React.createContext();

export class MyProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 9,
            difficulty: "easy"
        };
    }

    handleChange({ target: { value, name } }) {
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        this.setState(this.props.setDisplayGame(true));
    }
    render() {
        return (
            <MyContext.Provider
                value={{
                    state: this.state,
                    onChange: this.handleChange.bind(this),
                    onSubmit: this.handleSubmit.bind(this)
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}
