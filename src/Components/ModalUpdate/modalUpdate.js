import React, { Component } from "react";
import AddForm from "../AddForm";
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
        returnAddForm: false
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
        this.setState({value: event.target.value});
    };

    checkMessageID = async () => {
        const response = await this.services.checkDocumentId(this.state.value);

        console.log(response);

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
                returnAddForm: true
            });
        };
    };

    // checkDocumentId = async () => {

    //     let response;
    //     if (this.state.value.length > 0) {
    //         this.response = await this.board.checkDocumentId(this.state.value);
    //     }

    //     // Show error notification to user
    //     if (this.response === false) {
    //         this.setState({ 
    //             value: '',
    //             isError: true
    //         });

    //         setTimeout(() => {
    //             this.setState({
    //                 value: '',
    //                 isError: false
    //             });
    //         }, 2000)
    //     };

    //     // Show success notification to user
    //     if (this.response === true) {
    //         // this.updateCard();
    //         this.setState({ 
    //             value: '',
    //             isSuccess: true,
    //             modalReturnAdd: true
    //         });

    //         setTimeout(() => {
    //             this.setState({
    //                 value: '',
    //                 isSuccess: false,
    //                 isOpen: false,
    //                 modalReturnAdd: false
    //             });
    //         }, 2000)
    //     };

    // }

    // updateCard = async () => {
    //    // db.collection("orders").doc(this.state.value).update({foo: "bar"});
    //    await setDoc(doc(db, "orders", "396758"), {vendor: "Test"});
    // };

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
                    returnAddForm={this.state.returnAddForm}/>
            </>
        );
    };
};