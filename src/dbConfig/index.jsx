import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDbmJFBvSmy4b3xyfWSWbQc41p6cLOBE5s",
  authDomain: "attendance-c2bdc.firebaseapp.com",
  databaseURL: "https://attendance-c2bdc-default-rtdb.firebaseio.com",
  projectId: "attendance-c2bdc",
  storageBucket: "attendance-c2bdc.firebasestorage.app",
  messagingSenderId: "822295645624",
  appId: "1:822295645624:web:9ede59cf53119ba6bd134d",
};

// Initialize Firebase
const dbConfig = initializeApp(firebaseConfig);

export default dbConfig;
