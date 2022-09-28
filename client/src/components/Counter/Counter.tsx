import React from "react";

interface CounterProps {
    initCounter: number;
}

interface CounterState {
    counter: number;
}

class Counter extends React.Component<CounterProps, CounterState> {

    intervalId?: number;

    constructor(props: CounterProps) {
        super(props);

        this.state = {
            counter: props.initCounter
        }
    }

    // componentDidMount() {
    //     this.intervalId = window.setInterval(
    //         () => this.increment(),
    //         1000
    //     )
    // }

    // componentWillUnmount() {
    //     clearInterval(this.intervalId);
    // }

    increment = () => {
        this.setState((state, props) => ({
            counter: state.counter + 1
        }))
    }

    render() {
        return (
            <>
                <div>Counter value is: {this.state.counter}</div>
                <div><button onClick={this.increment}>Increase Counter</button></div>
            </>
        );
    }
}

export default Counter;