import firebase from "firebase/app";
import "firebase/firestore"; //파이어베이스 연동할때 꼭 

const firebaseConfig = {
    apiKey: "AIzaSyCs2N-AHYfEQMDHZQp8M3n2C3vUSOt9IQM",
    authDomain: "mydict-ce0dd.firebaseapp.com",
    projectId: "mydict-ce0dd",
    storageBucket: "mydict-ce0dd.appspot.com",
    messagingSenderId: "418951666145",
    appId: "1:418951666145:web:c7869481b37626c6f0daa0",
    measurementId: "G-WBVG0PDS41"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };