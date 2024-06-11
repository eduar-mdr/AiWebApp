// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "test-reto-conociemientos-ai.firebaseapp.com",
  databaseURL: "https://test-reto-conociemientos-ai-default-rtdb.firebaseio.com",
  projectId: "test-reto-conociemientos-ai",
  storageBucket: "test-reto-conociemientos-ai.appspot.com",
  messagingSenderId: "19771195991",
  appId: "1:19771195991:web:578682a1300e635337d912",
  measurementId: "G-ZZYF9DFSJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);

export { db };