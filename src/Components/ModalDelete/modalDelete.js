import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Board from "../Board/board";

import './modalDelete.css'

export default class ModalDelete extends Component {

    board = new Board();

    state = {
        value: '',
        isOpen: false,
        isError: false
    };

    // input handler
    handleChange(event) {
        this.setState({value: event.target.value});
    }

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

    // Try delete or return false if ID is incorrect
    deleteCard = async () => {

        const response = await this.board.deleteDocument(this.state.value);
        
        // Show error notification to user
        if (!response) {
            this.setState({ 
                isError: true
            });

            setTimeout(() => {
                this.changeStateErrorBackFalse();
            }, 2000)
        }
    }

    changeStateErrorBackFalse(){
        this.setState({
            value: '',
            isError: false
        });
    }

    render() {

        this.handleChange = this.handleChange.bind(this);

        return (
        <>
            <div
            className="d-flex align-items-center justify-content-center">
                <button variant="primary" onClick={this.openModal}>
                    Delete
                </button>
            </div>
            <Modal show={this.state.isOpen} 
                    onHide={this.closeModal}
                    backdrop="static"
                    keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>Enter card ID:</Modal.Body>
                    <input type="number" 
                            name="order-id" 
                            className={this.state.isError === false ? "d-block delete-input" : "d-none"}
                            value={this.state.value}
                            onChange={this.handleChange}
                            placeholder="Enter ID"
                            />
                    <div className={this.state.isError === true ? "d-block" : "d-none"}>
                        <i className="fal fa-exclamation-triangle fa-9x error-ic"></i>
                        <p className={this.state.isError === true ? "d-block error-text mt-2" : "d-none"}>Error, incorrect ID!</p>
                    </div>
                    
                <Modal.Footer>
                    <Button variant="secondary"
                            onClick={this.deleteCard}>
                    Delete
                    </Button>
                    <Button variant="secondary" onClick={this.closeModal}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        );
    }
}