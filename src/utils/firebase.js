// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3vTCKePxZWvgOJOHM5U64mjhF3Ohej3w",
  authDomain: "fileupload-bab14.firebaseapp.com",
  projectId: "fileupload-bab14",
  storageBucket: "fileupload-bab14.appspot.com",
  messagingSenderId: "868419517459",
  appId: "1:868419517459:web:56cad9e8e56208dbc013e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);