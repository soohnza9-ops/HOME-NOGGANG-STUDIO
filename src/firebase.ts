import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxNWXfDKR8AebCRK14Zl_2Zlb6Rn5bn8w",
  authDomain: "noggang-studio.firebaseapp.com",
  projectId: "noggang-studio",
  storageBucket: "noggang-studio.firebasestorage.app",
  messagingSenderId: "710393502326",
  appId: "1:710393502326:web:c84fca400ba781949e9d57"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});
