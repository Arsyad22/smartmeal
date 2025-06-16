import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTv2Ri9eBRGOGU4wn5plo5jIFfEnmLlNQ",
  authDomain: "smartmeal-4d5e2.firebaseapp.com",
  projectId: "smartmeal-4d5e2",
  storageBucket: "smartmeal-4d5e2.appspot.com",
  messagingSenderId: "1098214985819",
  appId: "1:1098214985819:web:2f6e4e2d6e4e4e8d1c6f6d",
  measurementId: "G-XXXXXXXXXX" // optional, safe to leave in
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
