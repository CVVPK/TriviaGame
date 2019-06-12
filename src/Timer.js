import React from "react";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.timeSettings.initTime,
            initExtra: this.props.timeSettings.initExtra,
            interval: null,
            extraTime: this.props.extraTime
        };
    }

    startTimer() {
        let interval = setInterval(() => {
            let time = this.state.time;
            this.setState({ time: --time });
        }, 1000);
        this.setState({ interval: interval });
    }
    stopAtZero() {
        if (this.state.time === 0) {
            clearInterval(this.state.interval);
            this.props.finishGame("Time is up!");
        }
    }
    addExtraTime() {
        if (this.state.extraTime !== this.props.extraTime) {
            let time = this.state.time;
            time += this.state.initExtra;
            this.setState({ extraTime: this.props.extraTime, time: time });
        }
    }
    componentDidMount() {
        this.startTimer();
    }
    componentDidUpdate() {
        this.addExtraTime();
        this.stopAtZero();
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    render() {
        return <div className="time">Time Left: {this.state.time}</div>;
    }
}
