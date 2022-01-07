import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAfk-7ATw8rFq2AZTWU5pmvf_cbVCBBcKs",
    authDomain: "myfirsttest112.firebaseapp.com",
    databaseURL: "https://myfirsttest112-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "myfirsttest112",
    storageBucket: "myfirsttest112.appspot.com",
    messagingSenderId: "508367851015",
    appId: "1:508367851015:web:65bb412427b9eeb7daa4a2"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { db, auth }