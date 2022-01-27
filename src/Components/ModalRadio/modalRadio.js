import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

import './modalRadio.css'

export default class ModalRadio extends Component {

    state = {
        isOpen: false,
        modalName: "Radio",
        hideModal: false
    };

    openModal = () => {
        this.setState({ 
            value: '',
            isOpen: true 
        });
    };

    closeModal = () => {
        this.setState({ 
            value: '',
            isOpen: false
        });
    };

    hide = () => {
        this.setState({
            hideModal: !this.state.hideModal
        });
    }

    render() {

        // className={!this.state.hideModal ? "d-block" : "d-none"}

        return (
            <>
                <div className="d-flex align-items-center justify-content-center">
                    <div type="button" className="btn btn-outline-secondary" onClick={this.openModal}>
                        {this.state.modalName}
                    </div>
                </div>
                <Modal show={this.state.isOpen} 
                        onHide={this.closeModal}
                        backdrop="static"
                        keyboard={false}
                        >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalName} Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                    <iframe src="https://irishradiolive.com/" id="radio-iframe"></iframe>
                    </Modal.Body>
                            
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.hide}>Hide</Button>
                            <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                        </Modal.Footer>
                </Modal>
            </>
            
        );
    };
};