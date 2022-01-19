import React, { Component } from "react";
import CheckIDForm from "../CheckIdForm"
import Services from "../Source/services";

import './modalUpdate.css'

export default class ModalUpdate extends Component {

    services = new Services();

    state = {
        id: '',
        jobtype:'',
        jobtext:'',
        vendor: '',
        jobid: '',
        value: '',
        time: '',
        timestamp: null,
        done: false,
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
            id: '',
            value: '',
            isOpen: false,
            returnAddForm: false,
            validated: false,
            isChecked: false
        });
    };

    // If message ID exists in DB?
    checkMessageID = async () => {
        // Get response true or false
        const response = await this.services.checkDocumentId(this.state.value);
        // Show error message, clear input field
        if (!response) {
            this.setState({ 
                value: '',
                isError: true
            });
            // Hide error message (2 sec)
            setTimeout(() => {
                this.setState({
                    isError: false
                });
            }, 2000)
        } else {
            // Get message data
            this.getDocumentById(this.state.value);
            // Clear value close modal window, return Update form
            this.setState({ 
                value: '',
                isOpen: false,
                returnAddForm: true,
            });
        };
    };

    getDocumentById = async (id) => {
        // Get full data
        const response = await this.services.getDocumentById(id);
        // Set dada to state
        this.setState({
            id: id,
            jobtype: response.jobtype,
            jobtext: response.jobtext,
            vendor: response.vendor,
            jobid: response.jobid,
            time: response.time,
            done: response.done,
            timestamp: response.timestamp,
            isChecked: response.urgent
        });
    }

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

    convertStringToBool(str){
        if (str === "true"){
          return true;
        } else {
          return false;
        };
      }

    prepareDataForDB = async (event) => {

        // Prepare DB data
        let data = {
        jobid: this.state.jobid,
        jobtext: this.state.jobtext,
        jobtype: this.state.jobtype,
        time: this.state.time,
        vendor: this.state.vendor,
        urgent: this.state.isChecked,
        done: this.state.done,
        timestamp: this.state.timestamp
        };
        //Update message to DB
        const request = await this.services.updateDocument(data, this.state.id);
        // Success message
        this.setState({ 
            validated: false,
            isSuccess: request
        });
        // Set state back to normal
        setTimeout(() => {
        this.setState({
            id: '',
            isChecked: false,
            returnAddForm: false,
            isSuccess: false
        });
        }, 2000);
    };

    // Get message ID input handler
    handleChange(event) {
        const {value, maxLength} = event.target;
        this.setState({
            value: value.slice(0, maxLength)
        });
    };

    handleJobTypeChange = (event) => {
        this.setState({
            jobtype: event.target.value
        });
    };

    handleJobIdChange = (event) => {
        const {value, maxLength} = event.target;
        this.setState({
            jobid: value.slice(0, maxLength)
        });
    };

    handleVendorChange = (event) => {
        const {value, maxLength} = event.target;
        this.setState({
            vendor: value.slice(0, maxLength)
        });
    };

    handleUrgentBoxChange = (event) => {
        this.setState({
            isChecked: !this.state.isChecked
        });
    };

    handleJobTextChange = (event) => {
        this.setState({
            jobtext: event.target.jobtext
        });
    };

    render() {

        this.handleChange = this.handleChange.bind(this);

        const {propsIdValue, propsVendor} = this.props;
        
        //console.log(propsIdValue)

        return (
            <>
                <div className="d-flex align-items-center justify-content-center">
                    <button type="button" className="btn btn-outline-secondary" onClick={this.openModal}>
                        {this.state.modalName}
                    </button>
                </div>
                <CheckIDForm
                    modalName={this.state.modalName} 
                    show={this.state.isOpen}
                    closeModal={this.closeModal}
                    isError={this.state.isError}
                    // Update ID input field value
                    value={this.state.value}
                    propsIdValue={propsIdValue}
                    propsVendor={propsVendor}
                    // Update ID listener
                    onChange={this.handleChange}
                    // Check if ID is in DB
                    modalFunction={this.checkMessageID}
                    // Below Update form props
                    isSuccess={this.state.isSuccess}
                    // If true open AddForm
                    returnAddForm={this.state.returnAddForm}
                    handleSubmit={this.handleSubmit}
                    validated={this.state.validated}
                    jobtype={this.state.jobtype}
                    handleJobTypeChange={this.handleJobTypeChange}
                    jobid={this.state.jobid}
                    handleJobIdChange={this.handleJobIdChange}
                    vendor={this.state.vendor}
                    handleVendorChange={this.handleVendorChange}
                    urgent={this.state.isChecked}
                    handleUrgentBoxChange={this.handleUrgentBoxChange}
                    jobtext={this.state.jobtext}
                    handleJobTextChange={this.handleJobTextChange}
                    />
            </>
        );
    };
};