import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { setDoc, serverTimestamp } from "firebase/firestore";
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

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./src/firebase";
import { doc, getDoc } from "firebase/firestore";

const App: React.FC = () => {
  const location = useLocation();

  const [authUser, setAuthUser] = useState<any>(null);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [supportResetKey, setSupportResetKey] = useState(0);

 
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthUser(null);
        setUserPlan(null);
        setUserStatus(null);
        setIsAdmin(false);
        setAuthLoading(false);
        return;
      }

      setAuthUser(user);

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setUserPlan(data.plan ?? null);
        setUserStatus(data.status ?? null);
        setIsAdmin(data.isAdmin === true);
      }

      setAuthLoading(false);
    });

    return () => unsub();
  }, []);

  if (authLoading) {
    return <div className="hidden" />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar
        currentPath={location.pathname}
        isLoggedIn={!!authUser}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={() => auth.signOut()}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
      />

      <div className="flex max-w-[1600px] mx-auto min-h-[calc(100vh-73px)]">
        <Sidebar
          currentPath={location.pathname}
          isOpen={isSidebarOpen}
          isAdmin={isAdmin}
          onSupportReset={() => setSupportResetKey((k) => k + 1)}
        />

        <main className="flex-1 p-8 md:p-12">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  onSelectTool={(id) => console.log("Tool selected:", id)}
                  onGoDownload={() => {}}
                />
              }
            />

            <Route path="/pricing" element={<Pricing />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/download" element={<Download />} />

<Route
  path="/mypage"
  element={
<MyPage onLogout={() => auth.signOut()} />
  }
/>


            <Route
              path="/support"
              element={<SupportCenter key={supportResetKey} />}
            />

            <Route
              path="/admin/support"
              element={
                isAdmin ? <AdminSupport /> : <Navigate to="/" replace />
              }
            />

   

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <footer className="border-t border-zinc-800 py-12 pt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
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

          <p className="text-zinc-500 text-sm">
            © 2024 NOGGANG STUDIO. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="/terms" className="hover:text-yellow-400">
              이용약관
            </a>
            <a href="/privacy" className="hover:text-yellow-400">
              개인정보처리방침
            </a>
          </div>
        </div>
      </footer>

{/* 로그인 모달 */}
{showLoginModal && (
  <LoginModal
    onClose={() => setShowLoginModal(false)}
    onLoginSuccess={() => {
      setShowLoginModal(false);
    }}
  />
)}

    </div>
  );
};

export default App;
