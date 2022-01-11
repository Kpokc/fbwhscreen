import React, { Component } from 'react'
import { db } from '../Source/source'
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import BoardOrders from '../BoardOrders';


export default class Board extends Component {

    state = {
        ordersList: [],
        idList: []
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

        const querySnapshot = await getDocs(collection(db, "orders"));
        let ordersId = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            ordersId.push(doc.id);
        });

        let id = (Math.floor(100000 + Math.random() * 900000)).toString();
        let date = new Date();
        let notAdded = true;

        while (notAdded){

            if (!ordersId.includes(id)){
                await setDoc(doc(db, "orders", id), {
                    jobid: 123,
                    jobtext: "Transfer 2 pallets from Advant",
                    jobtype: "transfer",
                    time: date.toLocaleString('en-GB').toString(),
                    vendor: "Neuravi",
                    urgent: false,
                    done: false,
                });
                console.log(`Document with ID ${id} was added!`)
                notAdded = false;
            }

            id = (Math.floor(100000 + Math.random() * 900000)).toString();
        }
    };

    async deleteDocument(id) {

        const querySnapshot = await getDocs(collection(db, "orders"));
        let ordersId = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            ordersId.push(doc.id);
        });

        if (ordersId.includes(id)) {
            try {
                await deleteDoc(doc(db, "orders", id));
                console.log(`Document with ID ${id} was deleted!`);
            }
            catch (error){
                console.error(error);
            };
        } else {
            // add some notification
            alert("Wrong")
        }
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
                <BoardOrders 
                    ordersList={ordersList}
                    deleteCard={this.deleteDocument}/>
                <button onClick={this.addDocument}>Add</button>
            </div>
        );
    };
};