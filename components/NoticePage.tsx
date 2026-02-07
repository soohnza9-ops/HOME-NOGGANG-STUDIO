import React, { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";

type Notice = {
  id: number;
  date: string;
  title: string;
  content: string;
};

const notices: Notice[] = [
  {
    id: 1,
    date: "2026-02-02",
    title: "서비스 점검 안내",
    content:
      "보다 안정적인 서비스 제공을 위해 서버 점검이 예정되어 있습니다.\n점검 시간 동안 일부 기능이 일시적으로 제한될 수 있습니다.",
  },
  {
    id: 2,
    date: "2026-01-28",
    title: "요금제 개편 안내",
    content:
      "요금제별 크레딧 정책이 일부 변경되었습니다.\n자세한 내용은 요금제 페이지를 참고해 주세요.",
  },
];

const NoticePage: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* 타이틀 */}
      <div className="flex items-center gap-4 mb-10">
        <Bell className="w-9 h-9 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
        <h1 className="text-3xl font-extrabold text-white">공지사항</h1>
      </div>

      <div className="space-y-6">
        {notices.map((notice) => {
          const isOpen = openId === notice.id;

          return (
            <div
              key={notice.id}
              className="relative rounded-2xl border border-yellow-400/40 bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-hidden"
            >
              {/* 왼쪽 강조 바 */}
              <div className="absolute left-0 top-0 h-full w-1 bg-yellow-400" />

              {/* 헤더 */}
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : notice.id)}
                className="w-full px-8 py-6 text-left"
              >
                {/* ⭐ 핵심: 카드 높이를 줄이고 내부를 중앙 정렬 */}
                <div className="flex items-center justify-between gap-6 min-h-[96px]">
                  {/* 왼쪽 텍스트 */}
                  <div className="flex flex-col justify-center gap-2 min-w-0 pl-5">
                    <span className="text-sm text-zinc-400">
                      {notice.date}
                    </span>
                    <span className="text-xl md:text-2xl font-bold text-white break-words">
                      {notice.title}
                    </span>
                  </div>

                  {/* 오른쪽 영역 */}
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-400 text-black font-extrabold whitespace-nowrap">
                      중요 공지
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 text-yellow-400"
                          : "text-zinc-400"
                      }`}
                    />
                  </div>
                </div>
              </button>

              {/* 펼침 내용 */}
              {isOpen && (
                <div className="px-8 pb-8 pt-4 text-base text-zinc-300 leading-relaxed whitespace-pre-line">
                  {notice.content}
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
