// src/firebase.example.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "FIREBASE_API_KEY_HERE",
    authDomain: "FIREBASE_AUTH_DOMAIN_HERE",
    projectId: "FIREBASE_PROJECT_ID_HERE",
    storageBucket: "FIREBASE_STORAGE_BUCKET_HERE",
    messagingSenderId: "FIREBASE_SENDER_ID_HERE",
    appId: "FIREBASE_APP_ID_HERE"  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Auth Provider
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };