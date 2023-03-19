import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzjd9dysjJZ6ocEen6O8vea-PnWTMBhsk",
  authDomain: "admin-dashboard-5a407.firebaseapp.com",
  projectId: "admin-dashboard-5a407",
  storageBucket: "admin-dashboard-5a407.appspot.com",
  messagingSenderId: "700112721434",
  appId: "1:700112721434:web:7700c4fed284a0aad763a3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
