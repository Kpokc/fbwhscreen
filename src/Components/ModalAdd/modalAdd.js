import React, { Component } from "react";
import Services from "../Source/services";
import AddForm from "../AddForm";

import './modalAdd.css';
import { serverTimestamp, Timestamp } from "firebase/firestore";

export default class ModalAdd extends Component {

  services = new Services();

  state = {
    isChecked: false,
    isOpen: false,
    validated: false,
    isSuccess: false,
    modalName: "Add",
    data: []
  };

  openModal = () => {
    this.setState({ 
      isChecked: false,
      isOpen: true,
      validated: false
    });
  };

  closeModal = () => {
    this.setState({
      isChecked: false,
      isOpen: false,
      validated: false,
    });
  };

  // Form submit handler
  handleSubmit = (event) => {

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

    let date = new Date();
    // Prepare DB data
    let data = {
      jobid: event.target.jobId.value,
      jobtext: event.target.message.value,
      jobtype: event.target.task.value,
      time: date.toLocaleString('en-GB'),
      timestamp: serverTimestamp(),
      vendor: event.target.vendor.value,
      urgent: this.convertStringToBool(event.target.urgent.value),
      done: false,
    };

    // Add message to DB
    const request = await this.services.addDocument(data);

    // Add message to DB
    this.setState({ 
        validated: false,
        isSuccess: request
    });

    // Set state back to normal
    setTimeout(() => {
      this.setState({
          isChecked: false,
          isOpen: false,
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

    return (
      <>
        <div className="d-flex align-items-center justify-content-center">
          <button variant="primary" onClick={this.openModal}>
            Add
          </button>
        </div>
        <AddForm modalName={this.state.modalName} 
                show={this.state.isOpen}
                closeModal={this.closeModal}
                validated={this.state.validated}
                onSubmit={this.handleSubmit}
                isChecked={this.state.isChecked}
                onChange={this.handleCheckBoxChange}
                isSuccess={this.state.isSuccess}
                // Imported from services
                handleJobIdInput={this.services.handleJobIdInput}
                handleVendorInput={this.services.handleVendorInput}/>
      </>
    );
  };
};