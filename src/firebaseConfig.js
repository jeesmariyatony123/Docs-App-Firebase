import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4rHFBX773EDenDzIgR76dqr-FAyiGcqU",
  authDomain: "docs-app-firebase.firebaseapp.com",
  projectId: "docs-app-firebase",
  storageBucket: "docs-app-firebase.appspot.com",
  messagingSenderId: "44941036726",
  appId: "1:44941036726:web:e463994def0b7388d6aa17",
  measurementId: "G-J3DF6FVF3R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)