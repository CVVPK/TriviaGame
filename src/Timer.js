import React from "react";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.timeSettings.initTime,
            initExtra: this.props.timeSettings.initExtra,
            interval: null,
            extraTime: this.props.extraTime,
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
        if (this.state.extraTime !== this.props.extraTime) {
            let time = this.state.time;
            time += this.state.initExtra;
            this.setState({ extraTime: this.props.extraTime, time: time });
        }
    }
    componentDidMount() {
        this.startTimer();
    }
    componentDidUpdate({ pause }) {
        this.addExtraTime();
        this.stopAtZero();
        if (this.props.pause !== pause) this.pauseResume();
    }

    componentWillUnmount() {
        this.stopTimer();
    }
    render() {
        return (
            <div className="time">
                {/* <button onClick={this.pauseResume.bind(this)}>PAUSE/RES</button> */}
                Time Left: {this.state.time}
            </div>
        );
    }
}
