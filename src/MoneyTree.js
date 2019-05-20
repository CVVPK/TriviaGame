import React from "react";

export default class MoneyTree extends React.Component {
    class(current) {
        if (current === this.props.current) return "current";
    }
    render() {
        return (
            <ul>
                {this.props.values.map((val, i) => (
                    <li key={val} className={this.class(i)}>
                        {val}
                    </li>
                ))}
            </ul>
        );
    }
}
