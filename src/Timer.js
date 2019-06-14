import React from "react";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.timeSettings.initTime,
            initExtra: this.props.timeSettings.initExtra,
            interval: null,
            paused: false
        };
    }

    startTimer() {
        let interval = setInterval(() => {
            let time = this.state.time;
            this.setState({ time: --time });
        }, 1000);
        this.setState({ interval: interval });
    }
    stopTimer() {
        clearInterval(this.state.interval);
    }

    stopAtZero() {
        if (this.state.time === 0) {
            this.stopTimer();
            this.props.finishGame("Time is up!");
        }
    }

    pauseResume() {
        if (!this.state.paused) this.stopTimer();
        else this.startTimer();

        this.setState({ paused: !this.state.paused });
    }

    addExtraTime() {
        let time = this.state.time;
        time += this.state.initExtra;
        this.setState({ time: time });
    }
    componentDidMount() {
        this.startTimer();
    }
    componentDidUpdate({ pause, extraTime }) {
        if (this.props.extraTime !== extraTime) this.addExtraTime();
        if (this.props.pause !== pause) this.pauseResume();
        this.stopAtZero();
    }

    componentWillUnmount() {
        this.stopTimer();
    }
    render() {
        return <div>Time Left: {this.state.time}</div>;
    }
}
