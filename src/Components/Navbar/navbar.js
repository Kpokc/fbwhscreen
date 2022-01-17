import React, { Component } from "react";
import ModalAdd from "../ModalAdd";
import ModalDelete from "../ModalDelete";
import ModalUpdate from "../ModalUpdate";
import Board from "../Board/board";
import Time from "../Time";

import './navbar.css'

export default class NavBar extends Component {

    board = new Board();

    state = {
        buttons: [
          { id: 1, button: <ModalAdd />, url: "#" },
          { id: 2, button: <ModalDelete />, url: "#"},
          { id: 3, button: <ModalUpdate />, url: "#" },
          { id: 4, button: 'Log Out', url: "#" },
          { id: 5, button: 'Radio', url: "#" },
        ]
    };

    render() {

        // List of buttons
        const buttons = this.state.buttons
        const btnList = buttons.map((btn) => {
            const { id, button, url } = btn;
            return (
                <li className="nav-item"
                    key={id}>
                    <a className="nav-link" 
                        href="#">{button}</a>
                </li>
            );
        });

        return (

          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary center">
                <div className="container-fluid">
                    <Time />
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
};