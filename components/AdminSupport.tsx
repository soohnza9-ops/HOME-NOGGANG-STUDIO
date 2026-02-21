
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Trash2, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  ChevronRight,
  Send,
  User,
  LayoutGrid,
  BarChart3,
  Star,
  ChevronDown
} from 'lucide-react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../src/firebase";
import { useEffect } from "react";

interface Inquiry {
  id: string;
  userEmail: string;
  type: string;
  title: string;
  status: 'open' | 'in_progress' | 'done';
  createdAt: string;
  content: string;
  adminReply?: string;
  repliedAt?: string;
    isFavorite?: boolean;
}
const AdminSupport: React.FC = () => {

  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>("전체");
  const [showFilter, setShowFilter] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  useEffect(() => {
  const q = query(
    collection(db, "supportTickets"),
    orderBy("createdAt", "desc")
  );

  const unsub = onSnapshot(q, (snap) => {
    const arr: Inquiry[] = [];
    snap.forEach((doc) => {
      const d = doc.data();
arr.push({
  id: doc.id,
  userEmail: d.email,
  type: d.type,
  title: d.title,
  status: d.status,
  createdAt: d.createdAt?.toDate().toLocaleString("ko-KR") || "",
  content: d.content,
  adminReply: d.adminReply,
  repliedAt: d.repliedAt?.toDate().toLocaleString("ko-KR"),
  isFavorite: d.isFavorite || false,
});

    });
const sorted = arr.sort((a, b) => {
  // 둘 다 답변 완료 → 최신순
  if (a.status === "done" && b.status === "done") {
    return a.createdAt < b.createdAt ? 1 : -1;
  }

  // 답변 안된 게 위로
  if (a.status !== "done" && b.status === "done") return -1;
  if (a.status === "done" && b.status !== "done") return 1;

  // 나머지 (open, in_progress) → 최신순
  return a.createdAt < b.createdAt ? 1 : -1;
});

setInquiries(sorted);

  });

  return () => unsub();
}, []);

const [inquiries, setInquiries] = useState<Inquiry[]>([]);
const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
const handleRegisterReply = async (id: string) => {
  if (!replyText.trim()) return;

  await updateDoc(doc(db, "supportTickets", id), {
    adminReply: replyText,
    repliedAt: serverTimestamp(),
    status: "done",
  });

  setReplyText("");
  setEditingReplyId(null); // ✅ 추가
};


const handleDelete = async (e: React.MouseEvent, id: string) => {
  e.stopPropagation();
  if (!window.confirm("정말 이 문의를 삭제하시겠습니까? (운영자 권한)")) return;

  await deleteDoc(doc(db, "supportTickets", id));

  if (selectedInquiryId === id) {
    setSelectedInquiryId(null);
  }
};

const toggleFavorite = async (
  e: React.MouseEvent,
  id: string,
  current: boolean
) => {
  e.stopPropagation();
  await updateDoc(doc(db, "supportTickets", id), {
    isFavorite: !current,
  });
};

  const toggleInquiry = (id: string) => {
    if (selectedInquiryId === id) {
      setSelectedInquiryId(null);
      setReplyText('');
    } else {
      setSelectedInquiryId(id);
      setReplyText('');
    }
  };

const filteredInquiries = inquiries.filter(inq => {
  const matchSearch =
    inq.userEmail.includes(searchQuery) || inq.title.includes(searchQuery);

  const matchType =
    typeFilter === "전체" ? true : inq.type === typeFilter;

  const matchFavorite =
  showFavoritesOnly ? inq.isFavorite === true : true;

return matchSearch && matchType && matchFavorite;

});


  const stats = {
    total: inquiries.length,
    open: inquiries.filter(i => i.status === 'open' || i.status === 'in_progress').length,
    done: inquiries.filter(i => i.status === 'done').length
  };

  return (
    <div className="animate-in fade-in duration-700 max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-yellow-400" />
            운영자 고객지원 대시보드
          </h2>
          <p className="text-zinc-500 mt-1">사용자들의 모든 문의사항을 관리하고 답변합니다.</p>
        </div>
        
        
        <div className="flex gap-4">
          <div className="bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-2xl flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-zinc-500" />
<div className="flex gap-6 text-sm">
  <div className="text-center">
    <p className="text-xs text-zinc-400 font-black tracking-wide">전체 문의</p>
    <p className="text-lg font-black text-white">{stats.total}</p>
  </div>

  <div className="w-px h-10 bg-zinc-800"></div>

  <div className="text-center">
    <p className="text-xs text-yellow-400 font-black tracking-wide">답변 대기</p>
    <p className="text-lg font-black text-yellow-400">{stats.open}</p>
  </div>

  <div className="w-px h-10 bg-zinc-800"></div>

  <div className="text-center">
    <p className="text-xs text-green-400 font-black tracking-wide">답변 완료</p>
    <p className="text-lg font-black text-green-400">{stats.done}</p>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="이메일 또는 제목으로 검색..."
            className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-yellow-400/50 transition-colors"
          />
        </div>
<div className="relative">
  <button
    onClick={() => setShowFilter(!showFilter)}
    className="p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors"
  >


    <Filter className="w-4 h-4 text-zinc-400" />
  </button>

<button
  onClick={() => setShowFavoritesOnly(v => !v)}
  className={`p-3 rounded-xl transition-colors ${
    showFavoritesOnly
      ? "bg-yellow-400 text-black"
      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
  }`}
>
  <Star
    className="w-4 h-4"
    fill={showFavoritesOnly ? "currentColor" : "none"}
  />
</button>

  {showFilter && (
    <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden">
      {[
        "전체",
        "환불 문의",
        "결제 / 요금제",
        "사용 방법",
        "오류 제보",
        "개선 사항",
        "프로그램 실행 / 설치 문제",
        "기타 문의"
      ].map((t) => (
        <button
          key={t}
          onClick={() => {
            setTypeFilter(t);
            setShowFilter(false);
          }}
          className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-zinc-800 ${
            typeFilter === t ? "text-yellow-400" : "text-zinc-300"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )}
</div>

      </div>

      {/* Inquiry List (One Column Accordion) */}
      <div className="space-y-4">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((inq) => {
            const isOpen = selectedInquiryId === inq.id;
            return (
              <div 
                key={inq.id}
                className={`bg-zinc-900 border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-yellow-400/50 rounded-[2rem] ring-1 ring-yellow-400/20' : 'border-zinc-800 rounded-2xl hover:border-zinc-700'
                }`}
              >
                {/* Accordion Header */}
                <div 
                  onClick={() => toggleInquiry(inq.id)}
                  className="p-6 cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-6 flex-1">
<span className={`text-xs font-black px-3 py-1.5 rounded-full border shrink-0 ${
  inq.status === 'done'
    ? 'text-green-400 border-green-400/30 bg-green-400/10'
    : inq.status === 'in_progress'
    ? 'text-yellow-300 border-yellow-300/30 bg-yellow-300/10'
    : 'text-zinc-300 border-zinc-600 bg-zinc-800/60'
}`}>
  {inq.status === 'done' ? '답변완료' : inq.status === 'in_progress' ? '답변중' : '답변대기'}
</span>
<div className="flex flex-col min-w-[160px] shrink-0 gap-1">
  <span className="text-sm font-black text-white">
    {inq.userEmail}
  </span>
  <span className="text-xs font-bold text-yellow-400">
    {inq.type}
  </span>
</div>

                    <h4 className={`text-base font-bold transition-colors truncate max-w-md ${isOpen ? 'text-yellow-400' : 'text-zinc-200 group-hover:text-yellow-400'}`}>
                      {inq.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-4">
<span className="text-sm font-bold text-zinc-300">
  {inq.createdAt}
</span>

<button
  onClick={(e) => toggleFavorite(e, inq.id, !!inq.isFavorite)}
  className="p-2 rounded-lg hover:bg-zinc-800"
>
  <Star
    className={`w-4 h-4 ${
      inq.isFavorite ? "text-yellow-400" : "text-zinc-600"
    }`}
    fill={inq.isFavorite ? "currentColor" : "none"}
  />
</button>

                    <div className={`p-2 rounded-lg transition-transform duration-300 ${isOpen ? 'rotate-180 bg-yellow-400/10 text-yellow-400' : 'text-zinc-500 bg-zinc-800/50'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Accordion Content (Expanded) */}
                {isOpen && (
                  <div className="px-8 pb-8 pt-4 space-y-8 animate-in slide-in-from-top-4 duration-300">
                    <div className="border-t border-zinc-800 pt-8 flex flex-col gap-8">
                      {/* Top: User Inquiry */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-[15px] font-black text-white tracking-wide">사용자 문의 내용</p>
                          <button 
                            onClick={(e) => handleDelete(e, inq.id)}
                            className="text-[10px] font-black text-red-500/50 hover:text-red-500 uppercase flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> 문의 삭제
                          </button>
                        </div>
<div className="bg-black/60 border border-zinc-700 rounded-2xl p-6 text-white leading-relaxed text-base whitespace-pre-wrap">
  {inq.content}
</div>
                      </div>

                      {/* Bottom: Reply Section */}
                      <div className="space-y-4">
                       <p className="text-[15px] font-black text-white tracking-wide">운영자 답변</p>
                        
{inq.adminReply && editingReplyId !== inq.id ? (
  <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6 text-zinc-300">
    <div className="flex items-center justify-between mb-4">
      <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">
        Sent Reply
      </p>

      <div className="flex items-center gap-4">
        <span className="text-[10px] text-zinc-500">{inq.repliedAt}</span>

        <button
          onClick={() => {
            setEditingReplyId(inq.id);
            setReplyText(inq.adminReply || "");
          }}
          className="text-xs text-yellow-400 hover:underline font-bold"
        >
          수정
        </button>
      </div>
    </div>

    <p className="text-sm italic whitespace-pre-wrap">
      {inq.adminReply}
    </p>
  </div>
) : (
  <div className="space-y-3">
    <textarea
      rows={4}
      value={replyText}
      onChange={(e) => setReplyText(e.target.value)}
      className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-yellow-400/50 transition-colors text-sm resize-none"
    />

    <button
      onClick={() => handleRegisterReply(inq.id)}
      className="w-full py-3 bg-yellow-400 text-black font-black rounded-xl hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 text-sm"
    >
      <Send className="w-4 h-4" />
      {inq.adminReply ? "답변 수정 완료" : "답변 등록 및 해결 처리"}
    </button>
  </div>

                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-20 border-2 border-dashed border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center text-zinc-600">
            <MessageSquare className="w-16 h-16 mb-4 opacity-10" />
            <p className="font-bold">검색 결과가 없거나 등록된 문의가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupport;
