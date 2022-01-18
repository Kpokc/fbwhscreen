import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default class AddForm extends Component {
    
    render (){

        const {modalName, show, onHide, isChecked, validated, onChange, onSubmit, closeModal, isSuccess, data} = this.props;
        
        //console.log(Object.keys(data))

        return (
            <Modal show={show} 
                    onHide={onHide}
                    backdrop="static"
                    keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{modalName} Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} 
                        onSubmit={onSubmit} 
                        className={isSuccess === false ? "d-block addform" : "d-none"}>
                <Form.Select aria-label="Default select example" 
                                className="mb-3"
                                id="task"
                                required>
                    <option value="pick">Pick</option>
                    <option value="receipt">Receipt</option>
                    <option value="collection">Collection</option>
                    <option value="delivery">Delivery</option>
                    <option value="transfer">Transfer</option>
                    <option value="other">Other</option>
                </Form.Select>

                <Form.Group className="mb-3" controlId="jobId">
                    <Form.Label>Job ID:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Job ID" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="vendor">
                    <Form.Label>Vendor:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Vendor" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="urgent">
                    <Form.Check type="checkbox" 
                                label="Urgent?" 
                                value={isChecked}
                                onChange={onChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Message:</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter Your Message" required/>
                </Form.Group>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal} className="btn btn-secondary toRigth">
                        Close
                    </Button>
                    <Button variant="secondary" type="submit" className="btn btn-secondary toRigth mx-2">
                    Submit
                    </Button>
                </Modal.Footer>
                </Form>

                <Modal.Footer className={isSuccess === true ? "d-block" : "d-none"}>
                    <div >
                        <i className="far fa-thumbs-up fa-9x awesome-ic"></i>
                        <p className="d-block error-text mt-3">Submitted!</p>

                    </div>
                </Modal.Footer>
                
            </Modal.Body>
            
            </Modal>
        );
    }
}