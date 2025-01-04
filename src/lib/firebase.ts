import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCUeiaH73ewG5th7Yg-fU5bhkRKfb5fICI",
  authDomain: "hukum-rtc.firebaseapp.com",
  projectId: "hukum-rtc",
  storageBucket: "hukum-rtc.firebasestorage.app",
  messagingSenderId: "409981818150",
  appId: "1:409981818150:web:699c93a1f3eb8b31bf5de7",
  measurementId: "G-XTJTW4YGLW",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
