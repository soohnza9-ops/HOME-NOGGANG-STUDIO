
import React, { useState } from "react";
import {
  ImageIcon,
  Mic,
  Music,
  FileText,
  Presentation,
  Video,
  ArrowUpRight,
  Lock,
} from "lucide-react";
import { Tool } from "../types";

interface DashboardProps {
  onSelectTool: (toolId: string) => void;
  onGoDownload: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectTool, onGoDownload }) => {

  const [showLockedModal, setShowLockedModal] = useState(false);
const [lockedPulse, setLockedPulse] = useState<string | null>(null);
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
      title: "AI 사진 생성기",
      desc: (
        <>대본, 텍스트 입력만으로<br/>고퀄리티 이미지를 즉시 생성합니다.  </>
      ),
      icon: ImageIcon,
      color: "bg-blue-500/10 text-blue-500",
      enabled: false,
    },
    {
      id: "voice",
      title: "음성 & 자막 생성기",
      desc: (
        <>다양한 목소리로 음성을 만들고<br/>자막을 자동으로 추출합니다.  </>
      ),
      icon: Mic,
      color: "bg-green-500/10 text-green-500",
      enabled: false,
    },
    {
      id: "lyrics",
      title: "음악 가사 싱크",
      desc: (
        <>음악과 가사의 완벽한 싱크를 조절해<br/>음악 영상을 제작합니다. </>
      ),
      icon: Music,
      color: "bg-purple-500/10 text-purple-500",
      enabled: false,
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
   <div className="space-y-12 bg-black/50 duration-700">

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




    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-700 p-4 md:p-6 mx-4 md:mx-8">




        <div className="relative z-10 max-w-2xl ml-6 md:ml-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
            </span>
            NEW: 노깡 STUDIO v0.0.89 업데이트 완료
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-[1.15]">
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
  className="px-8 py-3 bg-yellow-400 text-black font-black rounded-2xl ..."
>
  지금 시작하기
</button>
          </div>
        </div>

<div className="absolute top-1/2 right-12 -translate-y-1/2 w-72 h-72 bg-yellow-400/15 blur-[90px] rounded-full"></div>

        {/* Abstract Background Elements */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 md:mx-8">

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



             className={`group relative flex flex-col text-left p-8 bg-zinc-900/70 border border-zinc-700 rounded-[2rem] transition-all duration-500 overflow-hidden ${

                tool.enabled
 ? "hover:border-yellow-400/50 hover:bg-zinc-800/90 hover:-translate-y-1"
: "cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-5 mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg ${tool.color}`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-black text-zinc-100 group-hover:text-yellow-400 transition-colors">
                  {tool.title}
                </h4>
              </div>

              <p className="text-zinc-400 text-base leading-relaxed mb-10 z-10">
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
  이동하기
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