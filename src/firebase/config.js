import firebase from "firebase/app";
import 'firebase/firestore'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBnnaozlMWntRO0ZU3GIPyAeR3sOs0i1mw",
    authDomain: "cooking-ninja-site-78054.firebaseapp.com",
    projectId: "cooking-ninja-site-78054",
    storageBucket: "cooking-ninja-site-78054.appspot.com",
    messagingSenderId: "860103420606",
    appId: "1:860103420606:web:91f843272da026a7974cef",
    measurementId: "G-2FDNPDSJ98"
};
firebase.initializeApp(firebaseConfig)

//initialise services

const projectFirestore = firebase.firestore()

export default projectFirestore