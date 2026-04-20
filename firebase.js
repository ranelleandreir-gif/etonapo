import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBTkf7LjPDlTdRr1N_4xfvzdcjdMBGVKZk",
  authDomain: "eto-na-5543f.firebaseapp.com",
  projectId: "eto-na-5543f",
  storageBucket: "eto-na-5543f.firebasestorage.app",
  messagingSenderId: "914719267981",
  appId: "1:914719267981:web:50f6d701115695702516c4",
  measurementId: "G-96WDVXR9TD"
};

// INIT FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);