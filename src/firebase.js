// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCz_PvuyPzRcvfyQdwtoUnvNdC5DyTjvOg",
  authDomain: "myabcd-465103.firebaseapp.com",
  projectId: "myabcd-465103",
  storageBucket: "myabcd-465103.firebasestorage.app",
  messagingSenderId: "280582280911",
  appId: "1:280582280911:web:25ebaf5f806795e05a09ba",
  measurementId: "G-L8030X639L"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
//export const db = getAnalytics(app);
