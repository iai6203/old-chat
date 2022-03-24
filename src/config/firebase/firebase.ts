import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase, ref } from 'firebase/database'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDmZSW-zBeJhmI4Zv6Cuf67Pi8t-tQ_Z1o",
  authDomain: "chat-91a86.firebaseapp.com",
  databaseURL: "https://chat-91a86-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-91a86",
  storageBucket: "chat-91a86.appspot.com",
  messagingSenderId: "5256091543",
  appId: "1:5256091543:web:ac9d8a94bdeb41498dd6d2",
  measurementId: "G-3Y36C5CMVJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app, 'https://chat-91a86-default-rtdb.asia-southeast1.firebasedatabase.app/')
export const analytics = getAnalytics(app);

// Database Ref
export const chatRoomRef = ref(db, 'chat_room')