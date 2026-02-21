import React, { useState, useEffect } from 'react';
import { 
  Headset, 
  Plus, 
  ChevronRight, 
  MessageSquare, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  ArrowLeft,
  Send,
  X,
  ExternalLink,
  Search,
  Layout
} from 'lucide-react';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../src/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
type ViewState = 'list' | 'form' | 'detail';
type TabState = 'inquiry' | 'refund';

interface Ticket {
  id: string;
  status: "open" | "done";
  type: string;
  title: string;
  createdAt: any;
  content: string;
  adminReply?: string;
  repliedAt?: any;
}
function getStatusUI(status: "open" | "done") {
  if (status === "open") {
    return { text: "접수완료", class: "bg-yellow-400/15 text-yellow-300 border-yellow-400/40" };
  }

  if (status === "done") {
    return { text: "답변완료", class: "bg-green-500/10 text-green-500 border-green-500/30" };
  }

  return { text: status, class: "bg-zinc-800 text-zinc-400 border-zinc-700/50" };
}

const SupportCenter: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>('list');
  const [selectedType, setSelectedType] = useState("사용 방법");
const [title, setTitle] = useState("");
const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null);
const [inquiries, setInquiries] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState<TabState>('inquiry');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  
  useEffect(() => {
    // 고객센터 페이지로 "진입할 때마다" 초기화
    setView('list');
    setSelectedTicket(null);
    setActiveTab('inquiry');
  }, []);


const handleBackToList = () => {
  setSelectedTicket(null);
  setView('list');
};

  const handleOpenForm = () => setView('form');
  
  const handleOpenDetail = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setView('detail');
  };

  useEffect(() => {
  const unsubAuth = onAuthStateChanged(auth, (u) => {
    setUser(u);
    if (!u) {
      setInquiries([]);
    }
  });

  return () => unsubAuth();
}, []);

useEffect(() => {
  if (!user) return;

  const q = query(
    collection(db, "supportTickets"),
    where("uid", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const unsubTickets = onSnapshot(q, (snap) => {
    const arr: Ticket[] = [];
    snap.forEach((doc) => {
      arr.push({ id: doc.id, ...(doc.data() as any) });
    });
    setInquiries(arr);
  });

  return () => unsubTickets();
}, [user]);


  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto space-y-8 pb-24 px-4">
      {/* 1. 상단 헤더 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black mb-3">고객센터</h2>
          <p className="text-zinc-500 font-medium text-[15px]">문의 및 환불 요청을 여기서 관리할 수 있습니다</p>
        </div>
        
        <div className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800 self-start md:self-auto shadow-2xl">
          <button 
            onClick={() => { setActiveTab('inquiry'); setView('list'); }}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'inquiry' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'text-zinc-500 hover:text-white'}`}
          >
            <MessageSquare className="w-4 h-4" /> 내 문의 내역
          </button>
          <button 
            onClick={() => setActiveTab('refund')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'refund' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'text-zinc-500 hover:text-white'}`}
          >
            <RotateCcw className="w-4 h-4" /> 환불 요청
          </button>
        </div>
      </div>

      {activeTab === 'inquiry' ? (
        <>
          {/* 1-1. 내 문의 목록 섹션 */}
          {view === 'list' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <Clock className="w-5 h-5 text-zinc-500" /> 내 문의 목록
                </h3>
                <button 
                  onClick={handleOpenForm}
                  className="px-6 py-3 bg-yellow-400 text-black font-black rounded-xl text-sm hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-lg shadow-yellow-400/10"
                >
                  <Plus className="w-4 h-4" /> 문의하기
                </button>
              </div>

             <div className="bg-zinc-800/60 backdrop-blur-xl border border-yellow-400/25 rounded-[2.5rem] overflow-hidden shadow-lg">





                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="hidden md:table-header-group">
                    <tr className="border-b border-zinc-700 bg-zinc-800/80">
<th className="px-8 py-5 text-xs font-black text-zinc-400 uppercase tracking-widest w-40">상태</th>
<th className="px-4 md:px-12 py-4 text-xs font-black text-zinc-400 uppercase tracking-widest text-left">제목</th>
<th className="hidden md:table-cell px-8 py-5 text-xs font-black text-zinc-400 uppercase tracking-widest text-right">작성일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.length > 0 ? (
                        inquiries.map((inquiry) => (
                          <tr 
                            key={inquiry.id} 
                            className="border-b border-white/20 hover:bg-white/25 transition-colors cursor-pointer group"

                            onClick={() => handleOpenDetail(inquiry)}
                          >
                            <td className="px-3 md:px-8 py-4 w-[110px] md:w-auto">
                              <span
  className={`text-[13px] font-bold px-3.5 py-1.5 rounded-full border whitespace-nowrap inline-flex items-center justify-center ${

                                inquiry.status === "done"
                                  ? 'text-green-500 border-green-500/20 bg-green-500/5' 
                                  : inquiry.status === "in_progress"
                                  ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5'
                                  : 'text-zinc-400 border-zinc-800 bg-zinc-800/20'
                              }`}>
                               {inquiry.status === "open" ? "접수완료" : "답변완료"}

                              </span>
                            </td>
                           <td className="px-4 md:px-12 py-4 text-left">
                              <span className="font-bold text-zinc-200 group-hover:text-yellow-400 transition-colors break-words">
                                {inquiry.title}
                              </span>
                            </td>
                            <td className="hidden md:table-cell px-8 py-5 text-right whitespace-nowrap">
                              <span className="text-sm text-zinc-400 font-semibold">
{inquiry.createdAt?.toDate().toLocaleString("ko-KR")}
</span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-8 py-32 text-center">
                            <div className="flex flex-col items-center justify-center text-zinc-600">
                              <AlertCircle className="w-16 h-16 mb-4 opacity-10" />
                              <p className="font-black text-xl mb-2 text-zinc-400">아직 등록한 문의가 없습니다</p>
                              <p className="text-sm text-zinc-500">문의하실 내용이 있다면 우측 상단의 문의하기를 이용해주세요.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. 문의하기 작성 폼 */}
          {view === 'form' && (
            <div className="animate-in slide-in-from-right-8 duration-500 space-y-8">
              <div className="flex items-center gap-4">
                <button onClick={handleBackToList} className="p-2 hover:bg-zinc-800 rounded-xl transition-colors text-zinc-500 hover:text-white">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-black">문의 작성</h3>
              </div>

             <div className="bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 space-y-8 shadow-[0_0_40px_rgba(0,0,0,0.6)]">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">문의 유형</label>
                    <div className="relative">
                     <select
  value={selectedType}
  onChange={(e) => setSelectedType(e.target.value)}
  className="w-full bg-black border border-zinc-800 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-yellow-400/50 transition-colors appearance-none font-bold cursor-pointer"
>

                        <option>환불 문의</option>
                        <option>결제 / 요금제</option>
                        <option>사용 방법</option>
                        <option>오류 제보</option>
                        <option>개선 사항</option>
                        <option>프로그램 실행 / 설치 문제</option>
                        <option>기타 문의</option>
                      </select>
                      <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">제목</label>
<input
  type="text"
  value={title}
  onChange={(e) => {
    if (e.target.value.length <= 20) {
      setTitle(e.target.value);
    }
  }}
  maxLength={20}
  placeholder="제목을 입력하세요 (최대 20자)"
  className="w-full bg-black border border-zinc-800 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-yellow-400/50 transition-colors font-bold placeholder:text-zinc-700"
/>


                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">문의 내용</label>
<textarea 
  rows={8}
  value={message}
  onChange={(e) => {
    if (e.target.value.length <= 1500) {
      setMessage(e.target.value);
    }
  }}
  maxLength={1500}
  placeholder="문의 내용을 입력하세요 (최대 1500자)" 
  className="w-full bg-black border border-zinc-800 rounded-[1.5rem] py-5 px-6 text-white focus:outline-none focus:border-yellow-400/50 transition-colors font-medium leading-relaxed resize-none placeholder:text-zinc-700"
></textarea>


                </div>

                <div className="flex items-center gap-4 pt-4">
                 <button
  disabled={!user}
onClick={async () => {
  if (!user) return;

  await addDoc(collection(db, "supportTickets"), {
    uid: user.uid,
    email: user.email,
    type: selectedType,
    title: title,
    content: message,
    status: "open",
    createdAt: serverTimestamp(),
  });

  setTitle("");
  setMessage("");
  setSelectedType("사용 방법");
  setView("list");
}}

  className="flex-1 py-4 bg-yellow-400 text-black font-black rounded-xl hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 disabled:opacity-50"
>
  <Send className="w-4 h-4" /> 문의하기
</button>

                  <button onClick={handleBackToList} className="px-10 py-4 bg-zinc-800 text-zinc-400 font-black rounded-xl hover:bg-zinc-700 hover:text-white transition-all">
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}

 {view === 'detail' && selectedTicket && (
  <div className="animate-in fade-in duration-500 space-y-6">
    {/* 상단 헤더 */}
    <div className="flex items-center gap-4">
      <button
        onClick={handleBackToList}
        className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-500 hover:text-white transition"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h3 className="text-2xl font-black">문의 상세</h3>
    </div>

    {/* 카드 컨테이너 */}
    <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden shadow-xl ring-2 ring-yellow-400/40">



      {/* 카드 헤더 */}
<div className="p-6 border-b border-zinc-800">
  <div className="flex items-center gap-4 flex-wrap">
    <span
      className={`text-xs font-black px-3 py-1.5 rounded-full border shrink-0 ${
        selectedTicket.status === "done"
          ? "text-green-400 border-green-400/30 bg-green-400/10"
          : "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
      }`}
    >
      {selectedTicket.status === "done" ? "답변완료" : "접수완료"}
    </span>

    <span className="text-sm font-black text-yellow-400 whitespace-nowrap">
      {selectedTicket.type}
    </span>

    <span className="text-lg font-black text-white break-all">
      {selectedTicket.title}
    </span>
  </div>


        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-400 font-semibold">
            {selectedTicket.createdAt?.toDate().toLocaleString("ko-KR")}
          </span>

          {!selectedTicket.adminReply && (
            <button
              onClick={async () => {
                const { deleteDoc, doc } = await import("firebase/firestore");
                await deleteDoc(doc(db, "supportTickets", selectedTicket.id));
                setView("list");
                setSelectedTicket(null);
              }}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
            >
              🗑
            </button>
          )}
        </div>
      </div>

      {/* 본문 */}
      <div className="p-8 space-y-8">

        {/* 사용자 문의 */}
        <div className="space-y-3">
          <p className="text-xs font-black tracking-widest text-zinc-400">
            사용자 문의 내용
          </p>
<div className="bg-black/60 border border-zinc-800 rounded-2xl p-6 text-white leading-relaxed text-base whitespace-pre-wrap">
  {selectedTicket.content}
</div>
        </div>

        {/* 운영자 답변 */}
        {selectedTicket.adminReply ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black tracking-widest text-yellow-400">
                운영자 답변
              </p>
              <span className="text-xs text-zinc-500 font-semibold">
                {selectedTicket.repliedAt?.toDate().toLocaleString("ko-KR")}
              </span>
            </div>

<div className="bg-yellow-400/5 border border-yellow-400/30 rounded-2xl p-6 text-zinc-100 text-base leading-relaxed whitespace-pre-wrap">
  {selectedTicket.adminReply}
</div>
          </div>
        ) : (
          <div className="bg-zinc-800/40 border border-zinc-700 rounded-2xl p-10 flex flex-col items-center gap-3 text-center">
            <Clock className="w-8 h-8 text-yellow-400" />
            <p className="font-black text-zinc-200">답변 대기 중</p>
            <p className="text-sm text-zinc-500">
              운영자가 확인 후 답변을 남길 예정입니다
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
)}

        </>
      ) : (
        /* 1-3. 환불 요청 섹션 */
        <div className="animate-in fade-in duration-700 space-y-8">
          <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-[2.5rem] p-8 md:p-12 space-y-10 shadow-xl">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white flex items-center gap-3">
                <RotateCcw className="w-6 h-6 text-yellow-400" /> 환불 요청
              </h3>
              <div className="bg-yellow-400/5 border border-yellow-400/10 p-6 rounded-[1.5rem] flex items-start gap-4 shadow-inner">
                <AlertCircle className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-yellow-400/90 text-sm font-bold leading-relaxed">
                  결제 후 7일 이내이며 사용 횟수가 0회인 경우 환불이 가능합니다
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">환불 사유 선택</label>
                  <div className="relative">
                    <select className="w-full bg-black border border-zinc-800 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-yellow-400/50 transition-colors appearance-none font-bold cursor-pointer">
                      <option>환불 사유를 선택하세요</option>
                      <option>서비스 불만족</option>
                      
                      <option>기능 미지원</option>
                      <option>오결제 / 실수로 구매</option>
                      <option>기타</option>
                    </select>
                    <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 rotate-90 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">상세 내용 (선택)</label>
                  <textarea 
                    rows={4} 
                    placeholder="환불 사유를 입력하세요" 
                    className="w-full bg-black border border-zinc-800 rounded-[1.5rem] py-5 px-6 text-white focus:outline-none focus:border-yellow-400/50 transition-colors font-medium leading-relaxed resize-none placeholder:text-zinc-700"
                  ></textarea>
                </div>
              </div>

              <button className="w-full py-5 bg-zinc-800 text-white font-black rounded-[1.5rem] hover:bg-red-500/10 hover:text-red-500 border border-zinc-700/50 hover:border-red-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg">
                <RotateCcw className="w-5 h-5" /> 환불 요청하기
              </button>
            </div>
          </section>

          {/* 1-4. 정책 안내 (하단 링크) */}
          <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-[2.5rem] p-8 md:p-10 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black">정책 안내</h3>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-6">

<button
  onClick={() => navigate("/legal?type=terms")}
  className="text-sm text-zinc-500 hover:text-yellow-400 font-bold transition-colors flex items-center gap-2 group border-b border-transparent hover:border-yellow-400/20 pb-1"
>
  이용약관
  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</button>
<button
  onClick={() => navigate("/legal?type=privacy")}
  className="text-sm text-zinc-500 hover:text-yellow-400 font-bold transition-colors flex items-center gap-2 group border-b border-transparent hover:border-yellow-400/20 pb-1"
>
  개인정보 처리방침
  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default SupportCenter; 