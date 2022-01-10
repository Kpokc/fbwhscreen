import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Board from "../Board/board";

import './modalDelete.css'

export default class ModalDelete extends Component {

    board = new Board();

    state = {
        value: '',
        isOpen: false
    };

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

    deleteCard = () => {
        // this.board.deleteDocument(this.state.value);
        this.board.deleteDocument(this.state.value)
        this.setState({ 
            value: '',
            isOpen: false
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
                            className="delete-input"
                            value={this.state.value}
                            onChange={this.handleChange}
                            placeholder="Enter ID"
                            />
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