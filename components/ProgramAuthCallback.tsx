import { useEffect } from "react";
import { getAuth, getRedirectResult } from "firebase/auth";
import { app } from "../src/firebase";

export default function ProgramAuthCallback() {
  useEffect(() => {
    const auth = getAuth(app);

    getRedirectResult(auth).then(async (result) => {
      if (!result?.user) return;

      const idToken = await result.user.getIdToken();

      // 🔑 Electron으로 토큰 전달
      window.location.href = `noggang://login?token=${idToken}`;
    });
  }, []);

  return null;
}
