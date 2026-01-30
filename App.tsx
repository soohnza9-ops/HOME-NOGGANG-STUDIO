import MyPage from './components/MyPage';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';
import Guide from './components/Guide';
import Download from './components/Download';
import SupportCenter from './components/SupportCenter';
import AdminSupport from './components/AdminSupport';
import LoginModal from './components/LoginModal';
import { Page } from './types';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./src/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [supportResetKey, setSupportResetKey] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
const [authUser, setAuthUser] = useState<any>(null);
const [userPlan, setUserPlan] = useState<string | null>(null);
const [userStatus, setUserStatus] = useState<string | null>(null);
const [isAdmin, setIsAdmin] = useState(false);   
const [authLoading, setAuthLoading] = useState(true);
const [userUsage, setUserUsage] = useState<number>(0);
useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setAuthUser(null);
      setUserPlan(null);
      setUserStatus(null);
      setAuthLoading(false);
      return;
    }

    setAuthUser(user);

    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      const data = snap.data();
      setUserPlan(data.plan);
      setUserStatus(data.status);
      setUserUsage(data.totalUsage || 0);
      setIsAdmin(data.isAdmin === true);
    } else {
      setUserPlan(null);
      setUserStatus(null);
    }

    setAuthLoading(false);
  });

  return () => unsub();
}, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.DASHBOARD:
        return (
  <Dashboard
    onSelectTool={(id) => console.log('Tool selected:', id)}
    onGoDownload={() => setCurrentPage(Page.DOWNLOAD)}
  />
);
    case Page.MY_INFO:
      return (
        <MyPage
          onNavigate={setCurrentPage}
          onLogout={() => auth.signOut()}
        />
      );
      case Page.PRICING:
        return <Pricing />;
      case Page.GUIDE:
        return <Guide />;
      case Page.DOWNLOAD:
        return <Download />;

case Page.SUPPORT:
  return <SupportCenter key={supportResetKey} />;
case Page.ADMIN_SUPPORT:
  return <AdminSupport />;

      default:
        return (
  <Dashboard
    onSelectTool={(id) => console.log('Tool selected:', id)}
    onGoDownload={() => setCurrentPage(Page.DOWNLOAD)}
  />
);

    }
  };
if (authLoading) {
  return <div className="hidden"></div>;
}

return (
  <div className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
    <Navbar 
      currentPage={currentPage} 
      onNavigate={setCurrentPage} 
      isLoggedIn={!!authUser}
      onLoginClick={() => setShowLoginModal(true)}
      onLogout={() => auth.signOut()}
      onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
    />
      
    <div className="flex max-w-[1600px] mx-auto">
<Sidebar 
  currentPage={currentPage} 
  onNavigate={setCurrentPage} 
  isOpen={isSidebarOpen}
  isAdmin={isAdmin}
  onSupportReset={() => setSupportResetKey(k => k + 1)}
/>
        
      <main className="flex-1 p-8 md:p-12 transition-all duration-300">
        {renderPage()}
      </main>
    </div>

    <footer className="border-t border-zinc-800 py-12 mt-20">
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

        <p className="text-zinc-500 text-sm">© 2024 NOGGANG STUDIO. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-zinc-400">
          <a href="#" className="hover:text-yellow-400 transition-colors">이용약관</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">개인정보처리방침</a>
        </div>
      </div>
    </footer>

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
}


export default App;
