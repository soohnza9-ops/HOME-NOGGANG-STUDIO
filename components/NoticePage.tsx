import React, { useState, useEffect } from "react";
import { ChevronDown, AlertTriangle } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../src/firebase";

type Notice = {
  id: string;
  date: string;
  title: string;
  content: string;
  isPinned?: boolean;
  isVisible?: boolean;
};

const NoticePage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const q = query(
          collection(db, "notices"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const noticeList: Notice[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            date: data.createdAt?.toDate
              ? data.createdAt.toDate().toISOString().slice(0, 10)
              : "",
            title: data.title || "",
            content: data.content || "",
            isPinned: data.isPinned || false,
            isVisible: data.isVisible ?? true
          };
        });

        // 비공개는 필터링
        setNotices(noticeList.filter(n => n.isVisible));
      } catch (error) {
        console.error("공지사항 불러오기 실패:", error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white space-y-8">

      {/* 상단 타이틀 */}
      <div className="border-b border-yellow-400/40 pb-4">
        <h1 className="text-2xl font-bold">공지사항</h1>
      </div>

      {/* 리스트 */}
      <div className="space-y-4">
        {notices.map((notice) => {
          const isOpen = openId === notice.id;

          return (
            <div
              key={notice.id}
              className="border-l-4 border-yellow-400 bg-zinc-900 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenId(isOpen ? null : notice.id)
                }
                className="w-full px-6 py-6 flex justify-between items-center"
              >
                {/* 날짜 */}
                <div className="w-52 shrink-0 text-sm text-zinc-400">
                  {notice.date}
                </div>

                {/* 제목 */}
                <div className="flex-1 text-left px-4">
                  <div className="text-lg font-semibold flex items-center gap-3">
                    {notice.isPinned && (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    )}
                    {notice.title}
                  </div>
                </div>

                {/* 화살표 */}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isOpen ? "rotate-180 text-yellow-400" : ""
                  }`}
                />
              </button>

              {/* 내용 */}
              {isOpen && (
                <div className="px-6 pb-6 pt-4 border-t border-yellow-400/30">
                  <div className="text-zinc-300 leading-relaxed whitespace-pre-line">
                    {notice.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NoticePage;
