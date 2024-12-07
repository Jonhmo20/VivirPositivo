// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkN2x2WPhuW-OI72Txsqvl9opGdWsHUbw",
  authDomain: "vivirpositivo-ddb60.firebaseapp.com",
  projectId: "vivirpositivo-ddb60",
  storageBucket: "vivirpositivo-ddb60.appspot.com",
  messagingSenderId: "140160018786",
  appId: "1:140160018786:web:c57dc3127a58fc2deea43b",
  measurementId: "G-CXMTLVKDPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and export it
const storage = getStorage(app);
export { storage }; 

