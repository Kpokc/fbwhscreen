import React, { Component } from "react";
import Board from "../Board/board";
import CheckIDForm from "./checkIdForm"

import './modalDelete.css'

export default class ModalDelete extends Component {

    board = new Board();

    state = {
        value: '',
        isOpen: false,
        isError: false,
        modalName: 'Delete'
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

    checkDocumentId = async () => {

        const response = await this.board.checkDocumentId(this.state.value);
        // Show error notification to user
        if (response === false) {
            this.setState({ 
                value: '',
                isError: true
            });

            setTimeout(() => {
                this.changeStateErrorBackFalse();
            }, 2000)
        }

        if (response === true) {
            this.deleteCard();
            this.setState({ 
                value: '',
                isOpen: false
            });
        }
    }

    // Try delete or return false if ID is incorrect
    deleteCard = async () => {
        this.board.deleteDocument(this.state.value);
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
            <div className="d-flex align-items-center justify-content-center">
                <button variant="primary" onClick={this.openModal}>
                    Delete
                </button>
            </div>
            <CheckIDForm
                modalName={this.state.modalName} 
                show={this.state.isOpen}
                onHide={this.closeModal}
                closeModal={this.closeModal}
                isError={this.state.isError}
                value={this.state.value}
                onChange={this.handleChange}
                deleteCard={this.checkDocumentId} />
        </>
        );
    }
}