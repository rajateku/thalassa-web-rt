import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyDfKv9NBuC8mjC4N2dLPCrBCZd6PAYrRoA",
  authDomain: "thalassa.firebaseapp.com",
  projectId: "thalassa",
  storageBucket: "thalassa.appspot.com",
  messagingSenderId: "359273625066",
  appId: "1:359273625066:web:fca30933d9ab02dcd36e93",
  measurementId: "G-XRQM8KQFJP"
};
firebase.initializeApp(config);


export default firebase;