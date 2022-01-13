import React from "react";
import { Modal, Button } from "react-bootstrap";

const CheIDForm = ({show, onHide, onClick}) => {

    return (
        <Modal show={show} 
                    onHide={onHide}
                    backdrop="static"
                    keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>Enter card ID:</Modal.Body>
                    <input type="number" 
                            name="order-id" 
                            placeholder="Enter ID"
                            />
                    
                <Modal.Footer>
                    <Button variant="secondary">
                    Delete
                    </Button>
                    <Button variant="secondary" onClick={onClick}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}

export default CheIDForm;