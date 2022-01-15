import React, { Component } from "react";
import Board from "../Board/board";
import CheckIDForm from "../CheckIdForm"

import './modalDelete.css'

export default class ModalDelete extends Component {

    board = new Board();

    state = {
        value: '',
        isOpen: false,
        isError: false,
        isSuccess : false,
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

        console.log(this.state.value, this.state.value.length)
        let response;
        if (this.state.value.length > 0) {
            this.response = await this.board.checkDocumentId(this.state.value);
        }

        // Show error notification to user
        if (this.response === false) {
            this.setState({ 
                value: '',
                isError: true
            });

            setTimeout(() => {
                this.setState({
                    value: '',
                    isError: false
                });
            }, 2000)
        };

        // Show success notification to user
        if (this.response === true) {
            this.deleteCard();
            this.setState({ 
                value: '',
                isSuccess: true
            });

            setTimeout(() => {
                this.setState({
                    value: '',
                    isSuccess: false,
                    isOpen: false
                });
            }, 2000)
        };

    }

    // Try delete or return false if ID is incorrect
    deleteCard = async () => {
        this.board.deleteDocument(this.state.value);
    }

    render() {

        this.handleChange = this.handleChange.bind(this);

        return (
        <>
            <div className="d-flex align-items-center justify-content-center">
                <button variant="primary" onClick={this.openModal}>
                    {this.state.modalName}
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
                deleteCard={this.checkDocumentId} 
                isSuccess={this.state.isSuccess}/>
        </>
        );
    }
}