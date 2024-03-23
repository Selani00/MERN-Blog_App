// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-4b01b.firebaseapp.com",
  projectId: "mern-blog-4b01b",
  storageBucket: "mern-blog-4b01b.appspot.com",
  messagingSenderId: "22404509623",
  appId: "1:22404509623:web:9e6ea719a2a528dd2d4232"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

