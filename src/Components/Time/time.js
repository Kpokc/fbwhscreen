import React, {Component} from "react";

import './time.css'

export default class Time extends Component{

    state = {
        currentDateTime: null
      };

    // Set interval for the time
    componentDidMount() {
        this.updateTime();
        this.interval = setInterval(this.updateTime, 1000);
    }

    // UnSet interval for the time
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateTime = () => {
        const today = new Date();
        this.setState({
            currentDateTime: today.toLocaleTimeString()
        });
    };

    render(){
        return(
            <div className="navbar-brand">{this.state.currentDateTime}</div>
        );
    }
}