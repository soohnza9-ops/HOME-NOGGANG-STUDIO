import React, { useState } from 'react';
import { Play, FileText, Info, HelpCircle, ChevronRight } from 'lucide-react';

const Guide: React.FC = () => {

    const sections = [
  {
    title: '다운로드',
    icon: Play,
    content: '회원가입 후 프로그램 다운로드를 진행하세요.',
    media: {
      images: [
        '/images/signup.png',
      ],
      videos: [
        '/videos/signup.mp4',
      ]
    }
  },
  {
    title: 'API키 발급 가이드',
    icon: Play,
    content: '프로그램 설치 후 계정 로그인을 진행하세요. API Key가 필요한 기능의 경우 우측 상단의 API KEY 입력 버튼을 클릭하여 발급받은 키를 입력해야 합니다.',
    media: {
      images: [
        '/images/API.png',
      ],
      videos: [
        '/videos/API.mp4',
      ]
    }
  },
    {
    title: '간단 사용 가이드',
    icon: Play,
    content: '대본 작성 영역에 제작하고 싶은 영상의 주제나 대사를 입력하세요. 그 후 [생성하기] 버튼을 누르면 AI가 자동으로 배경 음악, 자막, 이미지 소스를 조합하여 영상을 제작합니다.',
    media: {
      videos: [
        '/videos/guide.mp4',
      ]
    }
  },
      {
    title: '설정 화면',
    icon: Play,
    content: '화면 비율 자막, 이미지 스타일 등 다양한 설정을 지원합니다.',
    media: {
      images: [
        '/images/settings.png',
      ]
    }
  },
      {
    title: '편집 화면',
    icon: Play,
    content: '간단한 편집으로 영상을 제작할 수 있습니다.',
    media: {
      images: [
        '/images/edit.png',
      ]
    }
  },
        {
    title: '스타일 및 참조 이미지',
    icon: Play,
    content: '원하는 이미지의 화풍(실사, 애니메이션, 3D 등)을 프롬프트에 포함하면 더욱 정확한 결과를 얻을 수 있습니다.',
    media: {
      images: [
        '/images/style.png',
      ],
            videos: [
        '/videos/style.mp4',
      ]
    }
  },
          {
    title: '장면 추가',
    icon: Play,
    content: '장면 추가 기능을 활용해 간단하게 편집 할 수 있습니다.',
    media: {
      images: [
        '/images/scene-add.png',
      ],
            videos: [
        '/videos/scene-subtitle.mp4',
      ]
    }
  },
          {
    title: '소제목 추가',
    icon: Play,
    content: '소제목 추가 기능을 활용해 간단하게 편집 할 수 있습니다.',
    media: {
      images: [
        '/images/subtitle.png',
      ],
            videos: [
        '/videos/scene-subtitle.mp4',
      ]
    }
  },
            {
    title: '에셋 추가 가이드',
    icon: Play,
    content: '내 PC에서 불러온 사진이나 동영상을 활용해 영상을 제작해보세요.',
    media: {
            videos: [
        '/videos/asset.mp4',
      ]
    }
  },
            {
    title: '수동 업로드 모드',
    icon: Play,
    content: '이미지 AI 생성을 제외하고 오디오만 생성하여 시작해보세요.',
    media: {
            videos: [
        '/videos/manual-fill.mp4',
      ]
    }
  },
              {
    title: '프로젝트 저장 (Beta)',
    icon: Play,
    content: '프로젝트 파일 저장과 불러오기로 작업을 이어서 할 수 있습니다. 현재 기능 개선 및 안정화 작업이 진행 중입니다.일부 UI 레이아웃이 환경에 따라 다르게 보일 수 있습니다.',
    media: {
            images: [
        '/images/project.png',
      ]
    }
  },
              {
    title: '자주 묻는 질문',
    icon: Play,
    content: 'Q&A를 확인해보세요.',
    media: {
            images: [
        '/images/Q&A.png',
      ]
    }
  },
];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeSection: any = sections[activeIndex];
  const ActiveIcon = activeSection.icon;

  return (
    <div className="w-full px-8">

      {/* 헤더 */}
      <div className="mb-16">
        <h2 className="text-4xl font-black mb-4">사용가이드</h2>
        <p className="text-zinc-500">
          노깡 STUDIO를 200% 활용하기 위한 가이드를 확인하세요.
        </p>
      </div>

      <div className="flex gap-12">

        {/* 사이드바 */}
<aside className="hidden md:block w-52 flex-shrink-0 sticky top-24 self-start h-fit">
  <div className="space-y-2">
            {sections.map((section, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left text-sm font-bold transition-all
                  ${
                    activeIndex === idx
                      ? 'bg-yellow-400 text-black'
                      : 'text-zinc-400 hover:bg-zinc-900'
                  }
                `}
              >
                {section.title}
                <ChevronRight className="w-4 h-4" />
              </button>
            ))}
          </div>
        </aside>

        {/* 콘텐츠 */}
        <main className="flex-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 transition-colors">

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-yellow-400">
                <ActiveIcon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black">{activeSection.title}</h3>
            </div>

            <div className="text-zinc-400 leading-loose mb-8">
              {activeSection.content}
            </div>

            {/* 🔥 미디어 영역 (다운로드 섹션에서만 출력) */}
{activeSection.media && (
  <div className="space-y-8">

    {/* 🔥 영상 먼저 */}
{activeSection.media.videos?.map((video: string, idx: number) => (
  <div key={idx} className="w-full">
    <video
      src={video}
      autoPlay
      muted
      loop
      playsInline
      controls
      className="w-full rounded-2xl border border-zinc-800"
    />
  </div>
))}

    {/* 🔥 이미지 아래 */}
    {activeSection.media.images?.map((img: string, idx: number) => (
      <div key={idx} className="w-full">
        <img
          src={img}
          alt=""
          className="w-full rounded-2xl border border-zinc-800"
        />
      </div>
    ))}

  </div>
)}

          </div>
        </main>

      </div>
    </div>
  );
};

export default Guide;