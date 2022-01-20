import React, { Component } from 'react'
import { db } from '../Source/source'
import Services from '../Source/services';
import BoardOrders from '../BoardOrders';

export default class Board extends Component {

    services = new Services();

    state = {
        ordersList: []
    };

    componentDidMount(){
        // Set listener
        this.setListener();
    };

    componentWillUnmount() {
        // UnSet listener
        let unsubscribe = db.collection("orders")
            .onSnapshot(() => {
            // Respond to data
            // ...
            });
        unsubscribe();

        // Clear state as listener updates state each time
        this.setState({
            ordersList: []
        });
    };

    setListener = async () => {
        db.collection("orders")
            .onSnapshot((querySnapshot) => {
                let orders = [];
                querySnapshot.forEach((doc) => {
                    orders.push(doc.id);
                });
                this.getOrders();
                //console.log("Current orders in DB: ", orders.join(", "));
            });
    };
    
    getOrders = async () => {
        const orders = await this.services.getOrders();

        this.setState({
            ordersList: orders
        });
    };

    deleteCard = async (id) => {
        await this.services.deleteDocument(id);
    };

    render (){

        const {ordersList} = this.state;

        return (
            <div className='row'>
                <BoardOrders 
                    ordersList={ordersList}
                    deleteCard={this.deleteCard}/>
            </div>
        );
    };
};