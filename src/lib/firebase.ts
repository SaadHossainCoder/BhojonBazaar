// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA_rGJSWFJpBNsTpCV2q97SDK0y20OaA0",
  authDomain: "bhojonbazaar-3e31d.firebaseapp.com",
  projectId: "bhojonbazaar-3e31d",
  storageBucket: "bhojonbazaar-3e31d.firebasestorage.app",
  messagingSenderId: "654346275257",
  appId: "1:654346275257:web:b508e366eaaa9241cd4e68",
  measurementId: "G-JD92CS0NVS"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { app, auth, db, analytics };
