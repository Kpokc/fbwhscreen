import React, { Component } from "react";
import Services from "../Source/services";
import CheckIDForm from "../CheckIdForm"

import './modalDelete.css'

export default class ModalDelete extends Component {

    services = new Services();

    state = {
        value: '',
        isOpen: false,
        isError: false,
        isSuccess : false,
        modalName: 'Delete'
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

    // input handler
    handleChange(event) {
        const {value, maxLength} = event.target;
        this.setState({
            value: value.slice(0, maxLength)
        });
    };

    // Delete message from DB
    deleteDocument = async () => {

        const response = await this.services.deleteDocument(this.state.value);

        if (!response) {
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
        } else {
            this.setState({ 
                value: '',
                isSuccess: response
            });
            
            setTimeout(() => {
                this.setState({
                    value: '',
                    isSuccess: false,
                    isOpen: false
                });
            }, 2000);
        };
    };

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
                modalFunction={this.deleteDocument} 
                isSuccess={this.state.isSuccess}/>
        </>
        );
    };
};