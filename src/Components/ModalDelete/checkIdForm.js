import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class CheckIDForm extends Component {

    render() {

        const {modalName, show, onHide, closeModal, isError, value, onChange, deleteCard} = this.props;
    
        return ( 
            <Modal show={show} 
                    onHide={onHide}
                    backdrop="static"
                    keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalName} Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>Enter card ID:</Modal.Body>
                    <input type="number" 
                            name="order-id" 
                            className={isError === false ? "d-block delete-input" : "d-none"}
                            value={value}
                            onChange={onChange}
                            placeholder="Enter ID"/>
                    <div className={isError === true ? "d-block" : "d-none"}>
                        <i className="fal fa-exclamation-triangle fa-9x error-ic"></i>
                        <p className={isError === true ? "d-block error-text mt-2" : "d-none"}>Error, incorrect ID!</p>
                    </div>
                        
                    <Modal.Footer>
                        <Button variant="secondary"
                                onClick={deleteCard}>
                        {modalName}
                        </Button>
                        <Button variant="secondary" onClick={closeModal}>
                        Close
                        </Button>
                    </Modal.Footer>
            </Modal>
        );
    }
}

export default CheckIDForm;