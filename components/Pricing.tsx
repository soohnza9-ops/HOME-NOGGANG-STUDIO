import { getAuth } from "firebase/auth";
import { setUserPlan } from "../src/planService";
import React, { useState } from 'react';
import { Check, Shield, CreditCard, X, Zap } from 'lucide-react';
import * as PortOne from "@portone/browser-sdk/v2";

const Pricing: React.FC = () => {

  const [selectedPlan, setSelectedPlan] = useState<string>('pro');

  const plans = [
    {
      id: 'free',
      name: 'FREE',
      price: '0',
      description: (
  <>
    AI 영상 제작 입문용<br />
    체험 플랜
  </>
),
      features: [
        '대본 분석 5회',
        '영상 5개 저장',
        '대본 3,000자 입력',        
        '성우 4종',
        '고급 AI 설정 X',
        '워터마크 ON'
      ],
    },
    {
      id: 'starter',
      name: '스타터',
      price: '14,900',
      originalPrice: '21,300',
      description:(
  <>
    워터마크 제거 및 <br />기본 제작 플랜
  </>
), 
      features: [
        '대본 분석 20회',
        '영상 20개 저장',
        '대본 20,000자 입력',
        '성우 전체',
        '고급 AI 설정 X',
        '워터마크 OFF'
      ],
    },
    {
      id: 'pro',
      name: '프로',
      price: '49,000',
      originalPrice: '70,000',
      description: (
  <>
   
    본격적인 콘텐츠 제작을 위한<br /> 최고의 플랜
  </>
),
      features: [
        '대본 분석 50회',
        '영상 50개 저장',
        '대본 35,000자 입력',
        '성우 전체',
        '고급 AI 설정 O',
        '워터마크 OFF'
      ],
      isPopular: true,
    },
    {
      id: 'business',
      name: '비즈니스',
      price: '69,000',
      originalPrice: '98,000',
      description:  (
  <>
   기능 제한 없는 상업용 <br /> 대량 제작 플랜
   
  </>
),
      features: [
        '대본 분석 무제한',
        '영상 무제한 저장',
        '대본 50,000자 입력',
        '성우 전체',
        'BGM 전체',
        '폰트 전체',
        '고급 AI 설정 O',
        '워터마크 OFF'
      ],
    },
  ];

  return (
 <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-[1400px] mx-auto px-12 overflow-x-hidden">


      {/* Header Section */}
      <div className="text-center mb-20">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold tracking-widest uppercase">
          Pricing Plans
        </div>
<h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
  선택의 폭을 넓힌
  <br className="md:hidden" />
  <span className="text-yellow-400">맞춤형 플랜</span>
</h2>
        <p className="text-zinc-500 text-lg mb-12 max-w-2xl mx-auto font-medium">
          당신의 크리에이티브 가치를 한 단계 더 높여보세요. <br className="hidden md:block"/>
          프로젝트의 규모에 최적화된 최신 AI 도구들을 제공합니다.
        </p>
        
</div> 

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative pb-10">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`group relative flex flex-col p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer ${
                isSelected 
                  ? 'bg-gradient-to-b from-zinc-800 to-zinc-900 border-yellow-400/50 shadow-[0_20px_60px_rgba(250,204,21,0.15)] z-20 scale-105' 
                  : 'bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700 shadow-lg z-10 scale-100 hover:-translate-y-1'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
{plan.isPopular && (
  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[11px] font-black tracking-wide px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-30 whitespace-nowrap">
    <Zap className="w-3.5 h-3.5 text-black fill-none stroke-[2.5]" />
    <span>Most Popular</span>
  </div>
)}

              
              <div className="mb-8">
               <h3 className={`text-[2rem] leading-none font-black mb-2 transition-colors ${
  isSelected ? 'text-yellow-400' : 'text-white'
}`}>
                  {plan.name}
                </h3>
                <p className="text-zinc-500 text-sm font-medium leading-snug">
                  {plan.description}
                </p>
              </div>

              <div className="mb-10">
<div className="flex flex-col gap-1">

  {plan.originalPrice && (
    <div className="flex items-center gap-2">
      <span className="text-yellow-400/80 text-xs font-bold">
        30%
      </span>
      <span className="text-zinc-600 text-sm line-through font-semibold">
        ₩{plan.originalPrice}
      </span>
    </div>
  )}

  <div className="flex items-end gap-2">
    <span className="text-4xl font-black tracking-tight text-yellow-400">
      ₩{plan.price}
    </span>

    <span className="text-zinc-500 text-sm font-bold mb-1">
      / 월
    </span>
  </div>

</div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-medium transition-all group-hover:translate-x-1">
                    {feature.endsWith('X') ? (
                      <div className="w-5 h-5 rounded-full bg-zinc-800/50 flex items-center justify-center shrink-0">
                        <X className="w-3 h-3 text-zinc-200" />
                      </div>
                    ) : (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-yellow-400 text-black' : 'bg-white/5 text-zinc-400'
                      }`}>
                        <Check className="w-3 h-3" />
                      </div>
                    )}
<span className={`${feature.endsWith('X') ? 'text-zinc-200' : 'text-zinc-300'}`}>
  {feature}
</span>
                  </div>
                ))}
              </div>
<button
onClick={async (e) => {
  e.stopPropagation();

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    window.location.href = "/login";
    return;
  }

  if (plan.id === "free") {
    await setUserPlan(user.uid, "free");
    alert("Free 플랜이 적용되었습니다.");
    return;
  }

  // 🔥 유료 플랜 결제
  try {
await PortOne.requestIssueBillingKey({
  storeId: "store-a8485a47-94f4-4c4d-8dc6-8de8e833f2dc",
  channelKey: "channel-key-45e4f3bf-e527-4c66-94a2-f70d19d7885c",
  billingKeyMethod: "CARD",
  issueId: `issue-${crypto.randomUUID()}`,
  issueName: `${plan.name} 정기결제 카드 등록`,
  customer: {
    fullName: user.displayName || "사용자",
    phoneNumber: "010-0000-0000",
    email: user.email || "test@test.com",
  },
});
  } catch (err) {
    console.error(err);
    alert("결제창 호출 중 오류 발생");
  }
}}

  className={`w-full py-4 text-base rounded-[1.25rem] font-black transition-all duration-300 transform active:scale-95 ${
    isSelected 
      ? 'bg-yellow-400 text-black shadow-[0_10px_20px_rgba(250,204,21,0.2)]' 
      : 'bg-zinc-800 text-white hover:bg-zinc-700'
  }`}
>
  시작하기
</button>

              
              {/* Background Accent for Selected Card */}
              {isSelected && (
                <div className="absolute inset-0 bg-yellow-400/5 rounded-[2.2rem] -z-10 blur-2xl opacity-40"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* PG Footer Section */}
      <div className="mt-32 p-1 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900/20 border border-zinc-800/50 rounded-[3rem] -z-10"></div>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <div>
              <h3 className="text-3xl font-black mb-4">신뢰할 수 있는 보안 결제</h3>
              <p className="text-zinc-500 text-lg leading-relaxed max-w-xl">
                노깡 STUDIO는 사용자들의 개인정보와 결제 정보를 보호하기 위해 전 세계적으로 검증된 보안 결제 시스템을 사용합니다.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-nowrap gap-4 pb-2">
              {[
                { icon: Shield, color: 'text-blue-400', label: '256비트 암호화' },
                { icon: CreditCard, color: 'text-yellow-400', label: '모든 국내외 카드' },
                { icon: Zap, color: 'text-purple-400', label: '간편 결제 지원' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-zinc-900/80 px-5 py-3 rounded-2xl border border-zinc-800 transition-all hover:border-zinc-700 group">

                  <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-bold text-zinc-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative w-full lg:w-[400px] h-[250px] group">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 to-transparent rounded-[2.5rem] border border-yellow-400/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative">
                 <div className="absolute -inset-8 bg-yellow-400/20 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                 <CreditCard className="w-32 h-32 text-yellow-400 opacity-20 transform -rotate-12 group-hover:rotate-0 transition-all duration-700" />
               </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
