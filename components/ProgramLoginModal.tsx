import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../src/firebase";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

async function redirectWithCustomToken(idToken: string) {
  const res = await fetch(
    "https://use-ewhxeg3kta-uc.a.run.app/auth/custom-token",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );

  const data = await res.json();
  if (!data.ok || !data.customToken) {
    throw new Error("CUSTOM_TOKEN_FAILED");
  }

  window.location.href = `noggang://login?token=${data.customToken}`;
}

const ProgramLoginModal: React.FC = () => {
  const navigate = useNavigate();
  const startedRef = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

  // ✅ 이미 로그인된 경우 → 5초 후 프로그램으로 이동
  useEffect(() => {
    if (!auth.currentUser) return;

    setIsAlreadyLoggedIn(true);

    const redirectTimer = setTimeout(async () => {
const idToken = await auth.currentUser!.getIdToken(true);
await redirectWithCustomToken(idToken);
    }, 5000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, []);

  // ✅ Google 로그인
  const handleGoogleLogin = async () => {
    if (startedRef.current) return;
    startedRef.current = true;

    try {
      setIsLoading(true);
      setError(null);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
const idToken = await result.user.getIdToken(true);
await redirectWithCustomToken(idToken);
    } catch {
      setError("Google 로그인에 실패했습니다. 다시 시도해주세요.");
      startedRef.current = false;
    } finally {
      setIsLoading(false);
    }
  };

  const closeToHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* 🔥 뒤 화면 블러 */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={closeToHome}
      />

      {/* 모달 */}
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 shadow-2xl">
        {/* 닫기 */}
        <button
          onClick={closeToHome}
          className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 헤더 */}
        <div className="text-center mb-6">
          <img
            src="/logo.png"
            alt="NOGGANG Studio"
            className="mx-auto mb-6 h-16 object-contain"
            draggable={false}
          />

          {isAlreadyLoggedIn ? (
            <>
              <h2 className="text-2xl font-black mb-3">
                이미 로그인되어 있습니다
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                웹과 노깡 STUDIO 프로그램 계정이<br />
                안전하게 연동되었습니다.<br />
                <span className="text-yellow-400 font-bold">
                  잠시 후 프로그램으로 이동됩니다.
                </span>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-black mb-2">
                노깡 STUDIO 프로그램 로그인
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                노깡 STUDIO 웹 계정과 프로그램을 연동하기 위해<br />
                Google 계정 인증을 진행합니다.<br />
                로그인 후 자동으로 프로그램으로 돌아갑니다.
              </p>
            </>
          )}
        </div>

        {/* 에러 */}
        {error && (
          <p className="text-red-400 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Google 로그인 버튼 (미로그인 상태만) */}
        {!isAlreadyLoggedIn && (
          <button
            disabled={isLoading}
            onClick={handleGoogleLogin}
            className="w-full py-4 bg-white text-black font-bold rounded-xl text-sm hover:bg-zinc-100 transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google로 계속하기
              </>
            )}
          </button>
        )}

        <p className="text-zinc-500 text-xs text-center mt-6 leading-relaxed">
          본 로그인은 노깡 STUDIO 웹과 데스크톱 프로그램 간<br />
          계정 연동을 위한 인증 절차입니다.
        </p>
      </div>
    </div>
  );
};

export default ProgramLoginModal;
