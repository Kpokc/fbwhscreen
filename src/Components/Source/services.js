import { db } from '../Source/source'
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc, orderBy, query } from "firebase/firestore";

export default class Services {

    // Get orders - board.js
    getOrders = async () => {
        const querySnapshot = await getDocs(collection(db, "orders"));
        let orders = []
        querySnapshot.forEach((doc) => {
            let combine = [...[doc.id], doc.data().done, 
                            doc.data().jobid, doc.data().jobtext, 
                            doc.data().jobtype, doc.data().time,
                            doc.data().urgent, doc.data().vendor, doc.data().timestamp.seconds];
            orders.push(combine);
        });

        console.log(orders)

        return this.sortArrayByUrgent(this.sortArrayByTime(orders));
    };

    // Sort by urgent
    sortArrayByUrgent(array){
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - 1; j++) {
                if (array[j][6] < array[j + 1][6]) {
                    let temp = array[j + 1];
                    array[j + 1] = array[j];
                    array[j] = temp;
                };
            };
        };
        return array;
    };

    // Sort by time
    sortArrayByTime(array){
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - 1; j++) {
                if (array[j][8] < array[j + 1][8]) {
                    let temp = array[j + 1];
                    array[j + 1] = array[j];
                    array[j] = temp;
                };
            };
        };
        return array;
    };

    // Check if message id is in DB
    checkDocumentId = async (id) => {
        const docRef = doc(db, "orders", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return true;
        } else {
            return false;
        }
    }

    // Check if message id is in DB
    getDocumentById = async (id) => {
        const docRef = doc(db, "orders", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return false;
        }
    }

    // Delete message from DB
    async deleteDocument(id) {
        // Check if ID is in DB
        const query = await this.checkDocumentId(id);

        if (query) {
            await deleteDoc(doc(db, "orders", id));
            console.log(`Document with ID ${id} was deleted!`);
            return true;
        } else {
            console.log(`Document with ID ${id} is incorrect!`);
            return false;
        }
    };

    async addDocument(data) {

        let notAdded = true;
        let id = (Math.floor(100000 + Math.random() * 900000)).toString();

        if (notAdded) {
            while (notAdded){
                // Check if ID is in DB
                const query = await this.checkDocumentId(id);
                // If not in DB, then add
                if (!query){
                    await setDoc(doc(db, "orders", id), data);
                    console.log(`Document with ID ${id} was added!`);
                    notAdded = false;
                };
                id = (Math.floor(100000 + Math.random() * 900000)).toString();
            };

            return true;
        } else {
            return false;
        };
    };

    async updateDocument(data, id) {

        const response = await setDoc(doc(db, "orders", id), data);
        console.log(`Document with ID ${id} was updated!`);

        return true;
    };

}