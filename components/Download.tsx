
import React from 'react';
import { Apple, Monitor, ChevronRight, Github } from 'lucide-react';
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
      "https://pub-fdaf3ec553274409b02106ec9d124b49.r2.dev/NOGGANG-STUDIO-Setup-0.1.31.exe";
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
  Current Version · v0.1.31
</span>
<h3 className="text-2xl font-black mb-1">
  전체 버전 보기
</h3>
<p className="text-zinc-500 text-sm">
  업데이트 날짜: 2026년 1월 27일
</p>

          </div>
          <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
        
<div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] flex items-center justify-between group cursor-pointer hover:border-yellow-400/30 transition-colors">
  <div>
    <span className="text-yellow-400 font-bold text-xs uppercase tracking-widest mb-2 block">
      Download Guide
    </span>
    <h3 className="text-2xl font-black mb-1">
      다운로드 방법
    </h3>
    <p className="text-zinc-500 text-sm">
      Windows에서 사용해보세요 
    </p>
  </div>

  <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
    <ChevronRight className="w-6 h-6" />
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
