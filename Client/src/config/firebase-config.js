import firebase from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBNK7DuhouXU-S1qpYvsS66ZX0MxAbmpxc",
  authDomain: "auth-4e01d.firebaseapp.com",
  projectId: "auth-4e01d",
  storageBucket: "auth-4e01d.appspot.com",
  messagingSenderId: "739747389383",
  appId: "1:739747389383:web:58a971f64fa8f60be743e2",
  measurementId: "G-GHJR9K2XTX",
};

//Initialize Firebase

firebase.initializeApp(firebaseConfig);
firebase.analytics();
