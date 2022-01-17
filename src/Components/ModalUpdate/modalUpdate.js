import React, { Component } from "react";
import CheckIDForm from "../CheckIdForm"
import Services from "../Source/services";

import './modalUpdate.css'

export default class ModalUpdate extends Component {

    services = new Services();

    state = {
        value: '',
        isOpen: false,
        isError: false,
        isSuccess : false,
        modalName: 'Edit',
        returnAddForm: false,
        validated: false,
        isChecked: false
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
            isOpen: false,
            returnAddForm: false,
            validated: false
        });
    };

    // input handler
    handleChange(event) {
        this.setState({value: event.target.value});
    };

    checkMessageID = async () => {

        const response = await this.services.checkDocumentId(this.state.value);

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
                isOpen: false,
                returnAddForm: true,
            });
        };
    };

    // Form submit handler
    handleSubmit = async (event) => {

        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        // Validate the Form
        if (form.checkValidity() === false) {

            this.setState({ 
                validated: true,
            });
        
        } else {
        // Prepare DB data 
        this.prepareDataForDB(event);
        };
    };

    prepareDataForDB = async (event) => {

        // let date = new Date();
        // // Prepare DB data
        // let data = {
        // jobid: event.target.jobId.value,
        // jobtext: event.target.message.value,
        // jobtype: event.target.task.value,
        // time: date.toLocaleString('en-GB').toString(),
        // vendor: event.target.vendor.value,
        // urgent: event.target.urgent.value,
        // done: false,
        // };

        // Add message to DB
        //const request = await this.services.addDocument(data);

        // Add message to DB
        this.setState({ 
            validated: false,
            isSuccess: true
        });

        // Set state back to normal
        setTimeout(() => {
        this.setState({
            isChecked: false,
            returnAddForm: false,
            isSuccess: false
        });
        }, 2000);
    };

    // Check box handler
    handleCheckBoxChange = (event) => {
        this.setState({
            isChecked: !this.state.isChecked
        });
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
                    modalFunction={this.checkMessageID} 
                    isSuccess={this.state.isSuccess}
                    returnAddForm={this.state.returnAddForm}
                    handleSubmit={this.handleSubmit}
                    validated={this.state.validated}
                    handleCheckBoxChange={this.handleCheckBoxChange}
                    isChecked={this.state.isChecked}/>
            </>
        );
    };
};