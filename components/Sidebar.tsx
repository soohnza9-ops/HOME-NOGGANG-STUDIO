import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  CreditCard,
  BookOpen,
  Headset,
  Download,
  LayoutDashboard,
  ShieldCheck,
  Bell,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  isAdmin: boolean;
  onSupportReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isAdmin,
  onSupportReset,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const menuItems = [
    { path: "/mypage", label: "내정보", icon: User },
    { path: "/", label: "HOME", icon: LayoutDashboard },
    { path: "/pricing", label: "요금제", icon: CreditCard },
    { path: "/guide", label: "사용가이드", icon: BookOpen },
      { path: "/notice", label: "공지사항", icon: Bell },
    { path: "/support", label: "고객센터", icon: Headset },
    { path: "/download", label: "다운로드", icon: Download },
    ...(isAdmin
        ? [
      { path: "/admin/support", label: "운영자 고객센터", icon: ShieldCheck },
      { path: "/admin/notice", label: "운영자 공지 등록", icon: Bell },
    ]
      : []),
  ];

  return (
    <aside className="w-64 border-r border-zinc-800 min-h-[calc(100vh-73px)] bg-zinc-950 z-30">
      <div className="sticky top-[73px] w-64 p-4 flex flex-col gap-2 z-40">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                if (item.path === "/support") {
                  onSupportReset();
                }
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/10"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-950"
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
