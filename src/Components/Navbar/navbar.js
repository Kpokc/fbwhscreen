import React, { Component } from "react";

import './navbar.css'

export default class NavBar extends Component {

    state = {
        buttons: [
          { id: 1, button: 'Add', url: "/Add" },
          { id: 2, button: 'Delete', url: "/Delete" },
          { id: 3, button: 'Update', url: "/Update" },
          { id: 4, button: 'Log Out', url: "/Log Out" },
          { id: 5, button: 'Radio', url: "/Radio" },
        ],
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

    // Time
    updateTime = () => {
        const today = new Date();
        this.setState({
            currentDateTime: today.toLocaleTimeString()
        });
    };

    render() {

        // List of buttons
        const buttons = this.state.buttons
        const btnList = buttons.map((btn) => {
            const { id, button, url } = btn;
            return (
                <li className="nav-item"
                    key={id}>
                    <a className="nav-link" href={url}>{button}</a>
                </li>
            );
        });

        
        return (

          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary center">
                <div className="container-fluid">
                    <div className="navbar-brand">{this.state.currentDateTime}</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            
                            {btnList}

                        </ul>
                    </div>
                </div>
            </nav>
          </div>
        );
    };
}