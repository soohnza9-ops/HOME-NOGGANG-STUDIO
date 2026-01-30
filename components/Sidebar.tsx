
import React from 'react';
import { Page } from '../types';
import { User, CreditCard, BookOpen, Headset, Download, LayoutDashboard, ShieldCheck } from 'lucide-react';


interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  isAdmin: boolean; 
  onSupportReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, isOpen, isAdmin, onSupportReset,  }) => {

const menuItems = [
  { id: Page.MY_INFO, label: '내정보', icon: User },
  { id: Page.DASHBOARD, label: 'HOME', icon: LayoutDashboard },
  { id: Page.PRICING, label: '요금제', icon: CreditCard },
  { id: Page.GUIDE, label: '사용가이드', icon: BookOpen },
  { id: Page.SUPPORT, label: '고객센터', icon: Headset },
  { id: Page.DOWNLOAD, label: '다운로드', icon: Download },
  ...(isAdmin
    ? [{ id: Page.ADMIN_SUPPORT, label: '운영자 고객센터', icon: ShieldCheck }]
    : []),
];

  if (!isOpen) return null;

  return (
<aside className="w-64 border-r border-zinc-800 min-h-[calc(100vh-73px)] bg-transparent z-30">

<div
  className="fixed left-0 top-[73px] w-64 p-4 flex flex-col gap-2 bg-black z-40"
>
    {menuItems.map((item) => {
      const Icon = item.icon;
      const isActive = currentPage === item.id;
      return (
        <button
          key={item.id}
          onClick={() => {
  onNavigate(item.id);

  if (item.id === Page.SUPPORT) {
    onSupportReset(); // ✅ 고객센터일 때만 강제 리셋
  }
}}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
            isActive
              ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/10'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Icon className="w-5 h-5" />
          {item.label}
        </button>
      );
    })}
  </div>
</aside>

  );
};

export default Sidebar;
