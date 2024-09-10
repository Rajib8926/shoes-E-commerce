// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKeePJeEtI4LeEYyW2CnwZKbO34i84F9w",
  authDomain: "e-shop-db2e3.firebaseapp.com",
  projectId: "e-shop-db2e3",
  storageBucket: "e-shop-db2e3.appspot.com",
  messagingSenderId: "58554608905",
  appId: "1:58554608905:web:78d83529bd8214aa6bb7d8",
  measurementId: "G-S5LJ0KX7JD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
