import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Board from "../Board/board";

import './modalAdd.css';

export default class ModalAdd extends Component {

  board = new Board();

  state = {
    isChecked: false,
    isOpen: false,
  };

  openModal = () => {
    this.setState({ 
      isChecked: false,
      isOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isChecked: false,
      isOpen: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    let date = new Date();

    // Prepare DB data
    let data = {
      jobid: event.target.jobId.value,
      jobtext: event.target.message.value,
      jobtype: event.target.task.value,
      time: date.toLocaleString('en-GB').toString(),
      vendor: event.target.vendor.value,
      urgent: event.target.urgent.value,
      done: false,
    }

    // Add message to DB
    this.board.addDocument(data)

    this.setState({ 
      isChecked: false,
      isOpen: false,
    });


    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
  };

  handleChange = (event) => {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  render() {

    return (
      <>
        <div className="d-flex align-items-center justify-content-center">
          <button variant="primary" onClick={this.openModal}>
            Add
          </button>
        </div>
        <Modal show={this.state.isOpen} 
                onHide={this.closeModal}
                backdrop="static"
                keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate onSubmit={this.handleSubmit}>
              <Form.Select aria-label="Default select example" 
                            className="mb-3" 
                            id="task">
                <option>Select task:</option>
                <option value="pick">Pick</option>
                <option value="receipt">Receipt</option>
                <option value="collection">Collection</option>
                <option value="delivery">Delivery</option>
                <option value="transfer">Transfer</option>
                <option value="other">Other</option>
              </Form.Select>

              <Form.Group className="mb-3" controlId="jobId">
                <Form.Label>Job ID:</Form.Label>
                <Form.Control type="text" placeholder="Enter Job ID"/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="vendor">
                <Form.Label>Vendor:</Form.Label>
                <Form.Control type="text" placeholder="Enter Vendor" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="urgent">
                <Form.Check type="checkbox" 
                            label="Urgent?" 
                            value={this.state.isChecked}
                            onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="message">
                <Form.Label>Message:</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter Your Message"/>
              </Form.Group>

              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeModal} className="btn btn-secondary toRigth">
                    Close
                </Button>
                <Button variant="secondary" type="submit" className="btn btn-secondary toRigth mx-2">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
          
        </Modal>
      </>
    );
  }
}