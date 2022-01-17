import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class CheckIDForm extends Component {

    render() {

        const {modalName, show, onHide, closeModal, isError, value, onChange, modalFunction, isSuccess} = this.props;

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
                            className={(isError === false) && (isSuccess === false) ? "d-block delete-input" : "d-none"}
                            value={value}
                            onChange={onChange}
                            placeholder="Enter ID"/>
                        {/* If  and Error */}
                    <div className={isError === true ? "d-block" : "d-none"}>
                        <i className="fal fa-exclamation-triangle fa-9x awesome-ic"></i>
                        <p className={isError === true ? "d-block error-text mt-2" : "d-none"}>Error, incorrect ID!</p>
                    </div>
                        {/* If success */}
                    <div className={isSuccess === true ? "d-block" : "d-none"}>
                        <i className="far fa-thumbs-up fa-9x awesome-ic"></i>
                        <p className={isSuccess === true && modalName === 'Delete' ? "d-block error-text mt-3" : "d-none"}>Deleted!</p>
                        <p className={isSuccess === true && modalName === 'Edit' ? "d-block error-text mt-3" : "d-none"}>Updated!</p>
                    </div>
                        
                    <Modal.Footer>
                        <Button variant="secondary" className={modalName === "Delete" ? "d-block" : "d-none"} onClick={modalFunction}>{modalName}</Button>
                        <Button variant="secondary" className={modalName === "Edit" ? "d-block" : "d-none"} onClick={modalFunction}>Updated</Button>
                        <Button variant="secondary" onClick={closeModal}>Close</Button>
                    </Modal.Footer>
            </Modal>
        );
    }
}