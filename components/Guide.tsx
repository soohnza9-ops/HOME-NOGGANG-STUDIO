import React from 'react';
import { Play, FileText, Info, HelpCircle, ChevronRight } from 'lucide-react';

const Guide: React.FC = () => {
  const sections = [
    { title: '다운로드', icon: Play, content: '회원가입 후 프로그램 다운로드를 진행하세요.' },
    { title: 'API키 발급 가이드', icon: Play, content: '프로그램 설치 후 계정 로그인을 진행하세요. API Key가 필요한 기능의 경우 우측 상단의 API KEY 입력 버튼을 클릭하여 발급받은 키를 입력해야 합니다.' },
    { title: '간단 사용 가이드', icon: FileText, content: '대본 작성 영역에 제작하고 싶은 영상의 주제나 대사를 입력하세요. 그 후 [생성하기] 버튼을 누르면 AI가 자동으로 배경 음악, 자막, 이미지 소스를 조합하여 영상을 제작합니다.' },
    { title: '스타일 및 참조 이미지', icon: Info, content: '원하는 이미지의 화풍(실사, 애니메이션, 3D 등)을 프롬프트에 포함하면 더욱 정확한 결과를 얻을 수 있습니다.' },
    { title: '장면 및 소제목 추가', icon: Play, content: '장면 및 소제목 추가 기능을 활용해 간단하게 편집 할 수 있습니다.' },
    { title: '에셋 추가 가이드', icon: Play, content: '내 PC에서 불러온 사진이나 동영상을 활용해 영상을 제작해보세요.' },
    { title: '수동 업로드 모드', icon: Play, content: '이미지 AI 생성을 제외하고 오디오만 생성하여 시작해보세요.' },
    { title: '자주 묻는 질문', icon: HelpCircle, content: 'Q: 생성된 영상의 저작권은 누구에게 있나요? A: 노깡 STUDIO를 통해 생성된 모든 결과물의 저작권은 사용자에게 귀속됩니다 (상업적 이용은 프로 플랜 이상 권장).' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full px-8">
      
      {/* 헤더 */}
      <div className="mb-16">
        <h2 className="text-4xl font-black mb-4">사용가이드</h2>
        <p className="text-zinc-500">
          노깡 STUDIO를 200% 활용하기 위한 가이드를 확인하세요.
        </p>
      </div>

      {/* 본문 영역 */}
      <div className="flex flex-col md:flex-row gap-12">

        {/* 🔥 왼쪽 사이드바 (Sticky 영역) */}
        <div className="md:w-64 md:flex-shrink-0">
          <div className="md:sticky md:top-28 space-y-2">
            {sections.map((section, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left text-sm font-bold transition-all ${
                  idx === 0
                    ? 'bg-yellow-400 text-black'
                    : 'text-zinc-400 hover:bg-zinc-900'
                }`}
              >
                {section.title}
                <ChevronRight className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* 🔥 오른쪽 콘텐츠 */}
        <div className="flex-1 space-y-16">
          {sections.map((section, idx) => {
            const Icon = section.icon;

            return (
              <div
                key={idx}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-400/30 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-yellow-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black">{section.title}</h3>
                </div>

                <div className="prose prose-invert max-w-none text-zinc-400 leading-loose">
                  {section.content}
                </div>

                <div className="mt-8 pt-8 border-t border-zinc-800">
                  <div className="w-full h-48 bg-black rounded-2xl flex items-center justify-center border border-zinc-800 overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 bg-yellow-400/5 group-hover:bg-yellow-400/10 transition-colors" />
                    <Play className="w-12 h-12 text-yellow-400 opacity-50 group-hover:scale-110 transition-transform" />
                    <span className="absolute bottom-4 left-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                      Tutorial Video {idx + 1}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Guide;