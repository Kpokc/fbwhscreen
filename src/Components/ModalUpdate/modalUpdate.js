import React, { Component } from "react";
import Board from "../Board/board";
import CheckIDForm from "../CheckIdForm"

import { db } from '../Source/source';
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";

import './modalUpdate.css'

export default class ModalUpdate extends Component {

    board = new Board();

    state = {
        value: '',
        isOpen: false,
        isError: false,
        isSuccess : false,
        modalName: 'Edit',
        modalReturnAdd: false
    };

    // input handler
    handleChange(event) {
        this.setState({value: event.target.value});
    }

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

    checkDocumentId = async () => {

        let response;
        if (this.state.value.length > 0) {
            this.response = await this.board.checkDocumentId(this.state.value);
        }

        // Show error notification to user
        if (this.response === false) {
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
        };

        // Show success notification to user
        if (this.response === true) {
            // this.updateCard();
            this.setState({ 
                value: '',
                isSuccess: true,
                modalReturnAdd: true
            });

            setTimeout(() => {
                this.setState({
                    value: '',
                    isSuccess: false,
                    isOpen: false,
                    modalReturnAdd: false
                });
            }, 2000)
        };

    }

    updateCard = async () => {
       // db.collection("orders").doc(this.state.value).update({foo: "bar"});
       await setDoc(doc(db, "orders", "396758"), {vendor: "Test"});
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
                modalFunction={this.checkDocumentId} 
                isSuccess={this.state.isSuccess}
                modalReturnAdd={this.state.modalReturnAdd}/>
        </>
        );
    }
}