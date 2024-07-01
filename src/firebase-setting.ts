// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDChJoSZyW8FbgmqdBfl3cfi0N5dST0v9U",
  authDomain: "justice-consignment.firebaseapp.com",
  projectId: "justice-consignment",
  storageBucket: "justice-consignment.appspot.com",
  messagingSenderId: "776580269461",
  appId: "1:776580269461:web:827cf801bd4815fd2fa29c",
  measurementId: "G-DP8GKYHWBJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
