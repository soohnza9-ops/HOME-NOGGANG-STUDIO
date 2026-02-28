
import React from 'react';
import { Apple, Monitor, Check, Github } from 'lucide-react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebase";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
const Download: React.FC = () => {
 
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
      <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 md:p-24 text-center">
        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto mb-10 shadow-2xl shadow-yellow-400/40">
  <img
    src="/logo.png"
    alt="NOGGANG STUDIO"
    className="w-full h-full object-contain"
  />
</div>
<h2 className="text-4xl md:text-[3.8rem] font-black mb-6 leading-[1.35]">
  창작을 더 빠르게, <br/>노깡 STUDIO 앱
</h2>

          <p className="text-zinc-500 text-lg mb-12 max-w-xl mx-auto">웹보다 2배 빠른 렌더링 속도와 강력한 파일 관리 기능을 경험하세요. <br/>모든 데이터는 안전하게 동기화됩니다.</p>
          
<div className="flex flex-col sm:flex-row items-center justify-center gap-6">

  {/* Windows */}
<button
  onClick={() => {
if (!user) {
  setShowLogin(true);
  return;
}
window.location.href =
  "https://github.com/soohnza9-ops/NOGGANG-STUDIO/releases/latest/download/NOGGANG-STUDIO-Setup-0.1.101.exe";
  }}

  className={`w-full sm:w-auto px-10 py-5 font-black rounded-[2rem] transition-all flex items-center justify-center gap-3 ${
"bg-yellow-400 text-black hover:bg-yellow-300 hover:-translate-y-1 cursor-pointer"
  }`}
>
  <Monitor className="w-6 h-6" />
  {user ? "Windows용 다운로드" : "로그인 후 다운로드"}
</button>



  {/* macOS – 출시예정 */}
<button
  disabled
  className="w-full sm:w-auto px-10 py-5 bg-zinc-900 border border-zinc-700 text-zinc-500 font-black rounded-[2rem] cursor-not-allowed flex items-center justify-center gap-3 relative"
>
  <Apple className="w-6 h-6 opacity-60" />
  macOS용 출시예정
</button>

</div>
        </div>

        {/* Floating circles decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] flex items-center justify-between group cursor-pointer hover:border-yellow-400/30 transition-colors">
          <div>
<span className="text-yellow-400 font-bold text-xs uppercase tracking-widest mb-2 block">
  SECURITY
</span>
<h3 className="text-2xl font-black mb-1">
  안전한 다운로드
</h3>
<p className="text-zinc-500 text-sm">
  공식 서버를 통해서만 파일이 배포됩니다.<br />
외부 사이트 링크는 제공하지 않습니다.
</p>

          </div>
<div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-yellow-400 transition-all">
  <Check className="w-6 h-6 text-yellow-400 group-hover:text-black transition-colors" />
</div>
        </div>
        
<div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] flex items-center justify-between group cursor-pointer hover:border-yellow-400/30 transition-colors">
  <div>
    <span className="text-yellow-400 font-bold text-xs uppercase tracking-widest mb-2 block">
      UPDATE
    </span>
    <h3 className="text-2xl font-black mb-1">
      지속적인 기능 개선
    </h3>
    <p className="text-zinc-500 text-sm">
      매달 새로운 기능과 최적화가 추가됩니다.<br />
사용자 피드백을 적극 반영합니다.
    </p>
  </div>

<div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-yellow-400 transition-all">
  <Check className="w-6 h-6 text-yellow-400 group-hover:text-black transition-colors" />
</div>
</div>

      </div>
{showLogin && (
  <LoginModal
    onClose={() => setShowLogin(false)}
    onLoginSuccess={() => setShowLogin(false)}
  />
)}
    </div>
  );
};

export default Download;
