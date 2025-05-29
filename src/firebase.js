// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANIcc2JMYoKwMsKV5fjsGQnluGLkv5yyU",
  authDomain: "amorize-8f94d.firebaseapp.com",
  projectId: "amorize-8f94d",
  storageBucket: "amorize-8f94d.appspot.com", // corrigido para ".appspot.com"
  messagingSenderId: "77620512429",
  appId: "1:77620512429:web:002e4daef9b948ad53e824",
  measurementId: "G-EFGLQ9ERJJ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
