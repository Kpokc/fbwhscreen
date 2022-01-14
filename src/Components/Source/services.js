import { db } from '../Source/source'
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";

export default class Services {

    // Get orders - board.js
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

        return orders;
        // this.setState({
        //     ordersList: orders
        // });
    };

}