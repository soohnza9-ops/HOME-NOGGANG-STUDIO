
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../src/firebase";
import { Page } from '../types';
import { LogOut, Menu, LayoutDashboard, CreditCard, BookOpen, Download } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, isLoggedIn, onLoginClick, onLogout, onToggleSidebar }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  const navItems = [
    { id: Page.DASHBOARD, label: 'HOME', icon: LayoutDashboard },
    { id: Page.PRICING, label: '요금제', icon: CreditCard },
    { id: Page.GUIDE, label: '사용 가이드', icon: BookOpen },
    { id: Page.DOWNLOAD, label: '다운로드', icon: Download },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="p-2 hover:bg-zinc-900 rounded-xl transition-colors text-zinc-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onNavigate(Page.DASHBOARD)}
          >
<div className="w-10 h-10 group-hover:scale-105 transition-transform">
  <img
    src="/logo.png"
    alt="NOGGANG Studio"
    className="w-full h-full object-contain"
    draggable={false}
  />
</div>

            <span className="font-black text-xl tracking-tighter uppercase">노깡 STUDIO</span>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-zinc-900/50 p-1 rounded-2xl border border-zinc-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 relative z-40">
<div
  onClick={() => {
    onNavigate(Page.MY_INFO);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }}
  className="flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition relative z-50 pointer-events-auto"
>

                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xs">
  {(user?.email || user?.displayName || "G")[0].toUpperCase()}
</div>

               <span className="text-sm font-medium text-zinc-300">
  {user?.email || user?.displayName || "Google User"}
</span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-zinc-500 hover:text-white transition-colors"
                title="로그아웃"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="px-6 py-2 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all text-sm"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
