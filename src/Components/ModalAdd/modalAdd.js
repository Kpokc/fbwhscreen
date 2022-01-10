import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class ModalAdd extends Component {
  state = {
    isOpen: false
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render() {

    return (
      <>
        <div
          className="d-flex align-items-center justify-content-center">
          <a variant="primary" onClick={this.openModal}>
            Add
          </a>
        </div>
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}