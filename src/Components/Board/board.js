import React, { Component } from 'react'
import { db } from '../Source/source'
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import BoardOrders from '../BoardOrders';


export default class Board extends Component {

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
     }

    async addDocument() {

        let id = (Math.floor(100000 + Math.random() * 900000)).toString();
        let date = new Date();

        await setDoc(doc(db, "orders", id), {
            jobid: 123,
            jobtext: "Transfer 2 pallets from Advant",
            jobtype: "pick",
            time: date.toLocaleString('en-GB').toString(),
            vendor: "Neuravi",
            urgent: false,
            done: false,
        });
    };

    async deleteDocument() {
        try {
            await deleteDoc(doc(db, "orders", "TSVdBwhUUROrrIhppdIi"));
            console.log("Document with ID was deleted: ", "TSVdBwhUUROrrIhppdIi");
        }
        catch (error){
            console.error(error);
        };
    };

    setListener = async () => {
        db.collection("orders")
            .onSnapshot((querySnapshot) => {
                var cities = [];
                querySnapshot.forEach((doc) => {
                    cities.push(doc.data().name);
                });
                this.getOrders();
                console.log("Current cities in CA: ", cities.join(", "));
            });
    };


    getOrders = async () => {
        const querySnapshot = await getDocs(collection(db, "orders"));
        let orders = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let combine = [...[doc.id], doc.data().done, 
                            doc.data().jobid, doc.data().jobtext, 
                            doc.data().jobtype, doc.data().time, 
                            doc.data().urgent, doc.data().vendor];
            orders.push(combine);
        });

        this.setState({
            ordersList: orders
        });
    };

    render (){

        const {ordersList} = this.state;

        return (
            <div className='row'>
                <BoardOrders ordersList={ordersList}/>
                <button onClick={this.addDocument}>Add</button>
            </div>
        );
    };
};