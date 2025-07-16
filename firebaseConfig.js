import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhbOzcXdpCFWN8vu1PQjR9dMHxKe848Xo",
    authDomain: "sem3-reacta3.firebaseapp.com",
    projectId: "sem3-reacta3",
    storageBucket: "sem3-reacta3.firebasestorage.app",
    messagingSenderId: "285466448886",
    appId: "1:285466448886:web:f16df8d5059f089439add7"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };