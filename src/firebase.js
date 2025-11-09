// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, remove } from "firebase/database"; // <-- add remove here

const firebaseConfig = {
  apiKey: "AIzaSyBk5t9Qd9aXehaZzPXZYSORZI-MmndEZhU",
  authDomain: "neuroflexmat-237e7.firebaseapp.com",
  databaseURL: "https://neuroflexmat-237e7-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "neuroflexmat-237e7",
  storageBucket: "neuroflexmat-237e7.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, push, set, remove }; // ✅ fixed
