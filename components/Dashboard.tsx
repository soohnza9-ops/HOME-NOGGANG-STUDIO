
import React, { useState, useEffect } from "react";
import {
  ImageIcon,
  Mic,
  Music,
  FileText,
  Presentation,
  Video,
  ArrowUpRight,
  Lock,
  Youtube
} from "lucide-react";
import { Tool } from "../types";

interface DashboardProps {
  onSelectTool: (toolId: string) => void;
  onGoDownload: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectTool, onGoDownload }) => {

  
const getBadge = (id: string) => {
  if (id === "video") return { text: "SIGNATURE", style: "bg-yellow-400 text-black" };
  if (id === "image") return { text: "BETA FREE", style: "bg-blue-500 text-white" };
  return null;
};
  const [showLockedModal, setShowLockedModal] = useState(false);
const [lockedPulse, setLockedPulse] = useState<string | null>(null);
const [bannerIndex, setBannerIndex] = useState(0);
const [autoSlide, setAutoSlide] = useState(true);
useEffect(() => {
  if (!autoSlide) return;

  const interval = setInterval(() => {
    setBannerIndex((prev) => (prev + 1) % 2);
  }, 10000);

  return () => clearInterval(interval);
}, [autoSlide]);
  const tools: Tool[] = [
    {
      id: "video",
      title: "AI 자동화 영상 제작",
      desc: (
        <>
          대본만 입력하면 장면 분석부터<br />
          영상 완성까지 자동으로 제작합니다.
        </>
      ),
      icon: Video,
      color: "bg-orange-500/10 text-orange-500",
      enabled: true,
    },
    {
      id: "image",
      title: "AI 사진 생성",
      desc: (
        <>대본, 텍스트 입력만으로 고퀄리티 <br/>나노 바나나 이미지를 즉시 생성합니다.  </>
      ),
      icon: ImageIcon,
      color: "bg-blue-500/10 text-blue-500",
      enabled: true,
    },
    {
      id: "voice",
      title: "음성 TTS 생성",
      desc: (
         <>다양한 목소리로 1인낭독<br/>또는 2인 대화 음성을 생성합니다.  </>
      ),
      icon: Mic,
      color: "bg-green-500/10 text-green-500",
      enabled: true,
    },
    {
      id: "lyrics",
      title: "음악 가사 싱크",
      desc: (
        <>음악과 가사의 완벽한 싱크를 조절해<br/>음악 영상을 제작합니다. </>
      ),
      icon: Music,
      color: "bg-purple-500/10 text-purple-500",
      enabled: true,
    },
    {
      id: "script",
      title: "AI 대본 만들기",
      desc: (
        <>유튜브, 틱톡 쇼츠를 위한<br/>맞춤형 대본을 생성합니다. </>
      ),
      icon: FileText,
      color: "bg-yellow-500/10 text-yellow-500",
      enabled: false,
    },
    {
      id: "thumb",
      title: "썸네일 제작",
      desc: (
        <>클릭률을 높이는 감각적인 썸네일을<br/>간단하게 디자인합니다.</>
      ),
      icon: Presentation,
      color: "bg-red-500/10 text-red-500",
      enabled: false,
    },
  ];

  const handleToolClick = (toolId: string) => {
    const tool = tools.find((t) => t.id === toolId);
    if (tool?.enabled) {
      onSelectTool(toolId);
      return;
    }
    setLockedPulse(toolId);
    window.setTimeout(() => setLockedPulse(null), 220);
  };

  return (
<div className="max-w-[1400px] mx-auto px-8 md:px-16 space-y-12 bg-black/50 duration-700">

{showLockedModal && (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md"
    onClick={() => setShowLockedModal(false)}
  >
   <div
  className="bg-zinc-900 border border-2 border-yellow-400/50 rounded-3xl p-10 max-w-md w-[90%] text-center shadow-2xl"
>

      {/* 🔒 자물쇠 아이콘 */}
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
          <Lock className="w-8 h-8 text-yellow-400" />
        </div>
      </div>

      <div className="text-yellow-400 text-3xl font-black mb-4">
        출시 예정
      </div>

      <div className="text-zinc-300 text-lg leading-relaxed">
        이 기능은 곧 출시될 예정입니다.<br />
        조금만 기다려 주세요.
      </div>
    </div>
  </div>
)}

{/* 🔔 팝업 메시지 추가 위치: 바로 이곳 */}



  <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-700 min-h-[280px] md:min-h-[320px]">

    <div
      className="flex w-full transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
    >

      {/* 1번 배너 */}
      <div className="w-full flex-none">
        <div className="bg-gradient-to-br from-zinc-900 to-black p-6 md:p-8 relative overflow-hidden h-full">

          <div className="relative z-10 max-w-2xl ml-2 md:ml-10">

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
              </span>
              NEW: 노깡 STUDIO v0.0.125 업데이트 완료
            </div>

            <h1 className="text-2xl md:text-5xl font-black mb-5 leading-snug">
              창작의 한계를 뛰어넘는 <br />
              <span className="text-yellow-400">AI 크리에이티브</span>
            </h1>

            <p className="text-zinc-400 text-base mb-6 leading-relaxed max-w-lg">
              최신 생성형 AI 기술을 활용하여 당신의 상상력을 현실로 만드세요. <br />
              복잡한 툴 없이, 단 한 번의 클릭으로 완성도 높은 콘텐츠를 제작합니다.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onGoDownload}
                className="px-8 py-3 bg-yellow-400 text-black font-black rounded-2xl"
              >
                지금 시작하기
              </button>
            </div>

          </div>

          {/* 배경 효과 */}
          <div className="absolute top-1/2 right-12 -translate-y-1/2 w-72 h-72 bg-yellow-400/15 blur-[90px] rounded-full"></div>

          <div className="absolute -right-24 -bottom-24 w-[36rem] h-[36rem] bg-yellow-400/12 blur-[140px] rounded-full"></div>

          <div className="absolute top-1/2 right-12 -translate-y-1/2 w-80 h-80 opacity-10 pointer-events-none select-none">
            <img
              src="/logo.png"
              alt="NOGGANG Studio"
              className="w-full h-full object-contain rotate-12"
              draggable={false}
            />
          </div>

        </div>
      </div>

      {/* 2번 배너 */}
{/* 2번 배너 */}
<div className="w-full flex-none">
  <div className="bg-gradient-to-br from-zinc-900 to-black p-6 md:p-8 relative overflow-hidden h-full">

    {/* 텍스트 영역 */}
    <div className="relative z-10 max-w-2xl ml-2 md:ml-10">

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold mb-6">
        NEW FEATURE
      </div>

      <h1 className="text-2xl md:text-5xl font-black mb-5 leading-snug">
        AI 콘텐츠 제작의<br />
        <span className="text-yellow-400">완전 자동화</span>
      </h1>

<p className="text-zinc-400 text-base mb-6 leading-relaxed max-w-lg">
  대본만 입력하면 
  장면에 맞는 이미지를 만들고<br />
  AI 음성을 생성해 자동으로 영상으로 제작합니다.
</p>

      <button
  onClick={() =>
    window.open("https://www.youtube.com/@%EB%85%B8%EA%B9%A1STUDIO", "_blank")
  }
className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black rounded-2xl flex items-center gap-2"
      >
        노깡스튜디오 <Youtube className="w-6 h-6 text-red-600" />
      </button>

    </div>

    {/* 오른쪽 영상 (텍스트 div 밖으로 이동) */}
    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[480px] hidden lg:block z-50">
      <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden border border-zinc-700 shadow-2xl">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/G7kB3BrugPk?autoplay=1&mute=1&controls=1"
          title="NOGGANG STUDIO"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      
    </div>

  </div>
  
</div>

    </div>
<div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-30">
  {[0, 1].map((i) => (
    <button
      key={i}
      onClick={() => {
  setBannerIndex(i);
  setAutoSlide(false);
}}
      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
        bannerIndex === i
          ? "bg-yellow-400 scale-110"
          : "bg-white/40 hover:bg-white"
      }`}
    />
  ))}
</div>
  </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
  role="button"
  tabIndex={0}
              key={tool.id}
onClick={() => {
  if (tool.enabled) {
    handleToolClick(tool.id);
  } else {
    setShowLockedModal(true);
  }
}}



className={`group relative flex flex-col text-left p-5 md:p-8 bg-zinc-900/70 border border-zinc-700 rounded-[2rem] transition-all duration-500 ${
  tool.enabled
    ? "hover:border-yellow-400/50 hover:bg-zinc-800/90 hover:-translate-y-1"
    : "cursor-pointer"
}`}
            >
{(tool.id === "voice" || 
  tool.id === "image" || 
  tool.id === "video" || 
  tool.id === "lyrics") && (
  <div className="absolute -top-3 right-4 z-30">
    <div
      className={`px-3 py-1 text-[12px] font-black tracking-widest rounded-full 
      shadow-lg text-black
      ${
        tool.id === "video"
          ? "bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500"
          : "bg-gradient-to-r from-zinc-500 via-zinc-600 to-zinc-800 text-white"
      }`}
    >
      {tool.id === "video" ? "SIGNATURE" : "BETA FREE"}
    </div>
  </div>
)}
              <div className="flex items-center gap-5 mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg ${tool.color}`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl md:text-2xl font-extrabold text-zinc-100 group-hover:text-yellow-400 transition-colors">
                  {tool.title}
                </h4>
              </div>

              <p className="text-zinc-400 text-base leading-relaxed mb-4 z-10">
                {tool.desc}
              </p>

{tool.enabled ? (
<div className="
  mt-auto flex items-center gap-2
  text-yellow-400
  font-extrabold text-base
  uppercase tracking-wider
  transition-transform duration-200
  transform group-hover:scale-110 group-hover:-translate-y-1
">
  <ArrowUpRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
  사용 가이드
</div>

) : (
<div className="mt-auto flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-white/80">
  <Lock className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" />
  출시 예정
</div>


)}



              <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-700">
                <Icon className="w-48 h-48" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;