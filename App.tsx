import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Guide from "./components/Guide";
import Download from "./components/Download";
import SupportCenter from "./components/SupportCenter";
import AdminSupport from "./components/AdminSupport";
import MyPage from "./components/MyPage";
import LoginModal from "./components/LoginModal";
import ProgramLoginModal from "./components/ProgramLoginModal";
import NoticePage from "./components/NoticePage";
import AdminNoticePage from "./components/AdminNoticePage";
import LegalPage from "./components/LegalPage";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./src/firebase";
import { doc, getDoc } from "firebase/firestore";

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
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

      try {
        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists()) {
          const data = snap.data();
          setIsAdmin(data.isAdmin === true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("관리자 권한 확인 오류:", error);
        setIsAdmin(false);
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

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (authLoading) {
    return <div className="hidden" />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <Navbar
        isLoggedIn={!!authUser}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={() => auth.signOut()}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
      />

      <div className="flex max-w-[1600px] mx-auto relative">
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
            <Route path="/auth/google" element={<></>} />

            <Route
              path="/"
              element={
                <Dashboard
                  onSelectTool={(id) => {
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "auto",
                    });

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
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "auto",
                    });

                    navigate("/download");
                  }}
                />
              }
            />

            <Route path="/notice" element={<NoticePage />} />

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
              element={
                isAdmin ? (
                  <AdminSupport />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/notice"
              element={
                isAdmin ? (
                  <AdminNoticePage />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route path="/legal" element={<LegalPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {isProgramAuth && <ProgramLoginModal />}
        </main>
      </div>

      <footer className="border-t border-zinc-800 py-12 pt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-8 h-8">
                <img
                  src="/logo.png"
                  alt="NOGGANG Studio"
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>

              <span className="font-bold text-lg">
                노깡 STUDIO
              </span>
            </div>

            <div className="flex gap-6 text-sm text-zinc-400 items-center justify-center">
              <a
                href="/legal?type=terms"
                className="hover:text-yellow-400 transition-colors"
              >
                이용약관
              </a>

              <a
                href="/legal?type=privacy"
                className="hover:text-yellow-400 transition-colors"
              >
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
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="
            fixed bottom-8 right-8 z-50
            bg-yellow-400 text-black font-bold
            px-5 py-3 rounded-full
            shadow-lg hover:scale-105 transition-all
          "
        >
          ↑ 위로 가기
        </button>
      )}

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