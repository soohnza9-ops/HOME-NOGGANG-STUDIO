import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { getFirestore, doc, setDoc,updateDoc, serverTimestamp } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth, googleProvider, app } from "../src/firebase";
const db = getFirestore(app);
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification
} from "firebase/auth";



interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}


const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifyNotice, setVerifyNotice] = useState(false);
const handlePasswordReset = async () => {
  if (!email) {
    setError("이메일을 먼저 입력해주세요.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    setVerifyNotice(true);
    setError(null);
  } catch (err: any) {
    setError("비밀번호 재설정 메일 전송 실패");
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    // ===============================
    // ✅ 회원가입
    // ===============================
    if (isRegistering) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user);

      // 🔒 유저 문서 최초 생성 (createdAt 여기서만)
      await setDoc(doc(db, "users", cred.user.uid), {
        email: cred.user.email,
        plan: "free",
        planExpireAt: null,
        totalUsage: 0,
        credits: {
          asset: 0,
          script: 0,
          video: 0,
        },
        isAdmin: false,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });

      await auth.signOut();
      setVerifyNotice(true);
      setIsRegistering(false);
      return;
    }

    // ===============================
    // ✅ 로그인
    // ===============================
    const cred = await signInWithEmailAndPassword(auth, email, password);

    if (!cred.user.emailVerified) {
      await auth.signOut();
      setVerifyNotice(true);
      return;
    }
await setDoc(
  doc(db, "users", cred.user.uid),
  {
    email: cred.user.email,        // ✅ 항상 이메일 저장
    lastLoginAt: serverTimestamp(),
  },
  { merge: true }
);

onLoginSuccess();

  } catch (err: any) {
    setError(err.message || "로그인 실패");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

       <div className="text-center mb-4">
         <img
  src="/logo.png"
  alt="Logo"
  className="mx-auto mb-6 h-16 object-contain"
/>

          <h2 className="text-3xl font-black mb-1">
            {isRegistering ? '회원가입' : '반갑습니다!'}
          </h2>
{!verifyNotice && (
  <p className="text-zinc-500">
    {isRegistering ? '새로운 창작의 세계로 초대합니다.' : '계정에 로그인하여 도구를 이용하세요.'}
  </p>
)}
        </div>
{verifyNotice && (
  <div className="bg-yellow-400/10 border border-yellow-400 text-yellow-300 px-4 py-2 mb-6 rounded-xl text-sm leading-tight text-center">


    이메일로 인증 링크를 보냈습니다.<br />
    메일함을 확인한 뒤 로그인하세요.
  </div>
)}

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-zinc-400 ml-1">이메일</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
<input 
  required
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="example@mail.com"
                className="w-full bg-black border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-yellow-400/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-zinc-400 ml-1">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
<input 
  required
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="••••••••"
                className="w-full bg-black border border-zinc-800 rounded-xl py-3.5 pl-12 pr-12 text-white focus:outline-none focus:border-yellow-400/50 transition-colors"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {!isRegistering && (
            <div className="flex justify-end">
<button
  type="button"
  onClick={handlePasswordReset}
  className="text-xs text-yellow-400 font-bold hover:underline"
>
  비밀번호를 잊으셨나요?
</button>
            </div>
          )}

          <button 
            disabled={isLoading}
            className="w-full py-4 bg-yellow-400 text-black font-black rounded-xl mt-4 hover:bg-yellow-300 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
            ) : (
              isRegistering ? '가입하기' : '로그인'
            )}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-zinc-800 text-center">
          <p className="text-zinc-500 text-sm">
            {isRegistering ? '이미 계정이 있으신가요?' : '아직 계정이 없으신가요?'}
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="ml-2 text-yellow-400 font-bold hover:underline"
            >
              {isRegistering ? '로그인하기' : '회원가입'}
            </button>
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
<button
onClick={async () => {
  // 1) Auth만 분리 (여기서만 실패 알림)
  let cred;
  try {
    cred = await signInWithPopup(auth, googleProvider);
  } catch {
    alert("Google 로그인 실패");
    return;
  }

  // 2) 로그인 성공 UI 먼저 처리
  onLoginSuccess();
  onClose();

  // 3) Firestore 동기화 (실패해도 알림/로그인 영향 없음)
  try {
    const uid = cred.user.uid;
    const ref = doc(db, "users", uid);

    await setDoc(
      ref,
      {
        email: cred.user.email,
        plan: "free",
        planExpireAt: null,
        totalUsage: 0,
        credits: {
          asset: 0,
          script: 0,
          video: 0,
        },
        isAdmin: false,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (e) {
    console.warn("Firestore sync failed:", e);
  }
    const idToken = await cred.user.getIdToken();
  window.location.href = `noggang://auth?token=${idToken}`;
}}

  className="w-full py-3 bg-white text-black font-bold rounded-xl text-sm hover:bg-zinc-100 transition-all flex items-center justify-center gap-3"
>

            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            Google로 계속하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
