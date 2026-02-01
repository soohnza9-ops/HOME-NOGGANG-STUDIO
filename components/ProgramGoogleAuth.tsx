import { useEffect } from "react";
import { GoogleAuthProvider, signInWithRedirect, getAuth } from "firebase/auth";
import { app } from "../src/firebase";

export default function ProgramGoogleAuth() {
  useEffect(() => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    signInWithRedirect(auth, provider);
  }, []);

  return null; // ❗ UI 없음 (중요)
}
