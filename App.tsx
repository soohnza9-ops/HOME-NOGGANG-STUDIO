import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Pricing from "./components/Pricing";
import Guide from "./components/Guide";
import Download from "./components/Download";
import SupportCenter from "./components/SupportCenter";
import AdminSupport from "./components/AdminSupport";
import MyPage from "./components/MyPage";
import LoginModal from "./components/LoginModal";
import ProgramLoginModal from "./components/ProgramLoginModal";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./src/firebase";
import { doc, getDoc } from "firebase/firestore";
import NoticePage from "./components/NoticePage";
import AdminNoticePage from "./components/AdminNoticePage";
import LegalPage from "./components/LegalPage";

const App: React.FC = () => {
  const location = useLocation();
    const navigate = useNavigate();
  const isProgramAuth = location.pathname === "/auth/google";

  const [authUser, setAuthUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [supportResetKey, setSupportResetKey] = useState(0);

  const [showTopButton, setShowTopButton] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthUser(null);
        setIsAdmin(false);
        setAuthLoading(false);
        return;
      }

      setAuthUser(user);

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setIsAdmin(data.isAdmin === true);
      }

      setAuthLoading(false);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  };

  handleResize(); // 첫 렌더 시 실행
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

  if (authLoading) {
    return <div className="hidden" />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* ✅ 항상 렌더 (뒤 화면 유지용) */}
      <Navbar
        currentPath={location.pathname}
        isLoggedIn={!!authUser}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={() => auth.signOut()}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
      />

<div className="flex max-w-[1600px] mx-auto relative">

  {/* 🔥 모바일 오버레이 */}
  {isSidebarOpen && (
    <div
      className="fixed inset-0 bg-black/50 z-30 md:hidden"
      onClick={() => setIsSidebarOpen(false)}
    />
  )}

  <Sidebar
    currentPath={location.pathname}
    isOpen={isSidebarOpen}
    isAdmin={isAdmin}
    onSupportReset={() => setSupportResetKey((k) => k + 1)}
  />

  <main className="flex-1 min-w-0 p-6 md:p-12 relative">
          <Routes>
            {/* 🔑 프로그램 로그인 진입점 (페이지 없음, URL 유지용) */}
            <Route path="/auth/google" element={<></>} />

<Route
  path="/"
  element={
    <Dashboard
onSelectTool={(id) => {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  if (
    id === "video" ||
    id === "image" ||
    id === "voice" ||
    id === "lyrics"
  ) {
    navigate("/guide");
  }
}}
      onGoDownload={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        navigate("/download");
      }}
    />
  }
/>

<Route path="/notice" element={<NoticePage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/download" element={<Download />} />
            <Route
              path="/mypage"
              element={<MyPage onLogout={() => auth.signOut()} />}
            />
            <Route
              path="/support"
              element={<SupportCenter key={supportResetKey} />}
            />
            <Route
              path="/admin/support"
              element={isAdmin ? <AdminSupport /> : <Navigate to="/" replace />}
            />

<Route path="/admin/notice" element={<AdminNoticePage />} />
<Route path="/legal" element={<LegalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* ✅ 프로그램 로그인 오버레이 */}
          {isProgramAuth && <ProgramLoginModal />}
        </main>
      </div>

<footer className="border-t border-zinc-800 py-12 pt-20">
  <div className="max-w-7xl mx-auto px-6">

    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">

      {/* 🔹 좌측: 로고 */}
      <div className="flex items-center gap-3 justify-center md:justify-start">
        <div className="w-8 h-8">
          <img
            src="/logo.png"
            alt="NOGGANG Studio"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
        <span className="font-bold text-lg">노깡 STUDIO</span>
      </div>

      {/* 🔹 중앙: 사업자 정보 */}
      <div className="text-[10px] md:text-sm text-zinc-500 text-center space-y-1 leading-snug">
        <p>상호명: 딥탁시스템 | 대표자: 김정탁 | 사업자등록번호: 460-03-03869 | 통신판매업 신고번호 :제 2026-인천미추홀-0274호</p>
        <p>주소: 인천광역시 미추홀구 용현동 627-85 | 전화번호: 070-8098-1565 | 이메일: noggang.studio@gmail.com</p>
      </div>

{/* 🔹 우측: 약관 */}
<div className="flex gap-6 text-sm text-zinc-400 items-center md:items-end">
<a href="/legal" className="hover:text-yellow-400">
  이용약관
</a>
<a href="/legal" className="hover:text-yellow-400">
  개인정보처리방침
</a>
</div>

    </div>

    <p className="text-zinc-600 text-xs text-center mt-10">
      © 2026 NOGGANG STUDIO. All rights reserved.
    </p>

  </div>
</footer>

{showTopButton && (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="fixed bottom-8 right-8 z-50
               bg-yellow-400 text-black font-bold
               px-5 py-3 rounded-full
               shadow-lg hover:scale-105 transition-all"
  >
    ↑ 위로 가기
  </button>
)}
      {/* 웹 로그인 모달 */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default App;
