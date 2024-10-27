// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "avidgen-aaa1c.firebaseapp.com",
  projectId: "avidgen-aaa1c",
  storageBucket: "avidgen-aaa1c.appspot.com",
  messagingSenderId: "959692336966",
  appId: "1:959692336966:web:d9e619b91ed5dc04253f47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);