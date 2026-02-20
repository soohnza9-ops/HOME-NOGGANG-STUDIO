import React, { useState } from "react";

const LegalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");

  return (
    <div className="max-w-4xl mx-auto text-white px-6 py-16">
      
      {/* 상단 버튼 */}
      <div className="flex justify-center gap-3 mb-16 border-b border-zinc-800 pb-8">
        <button
          onClick={() => setActiveTab("terms")}
          className={`
            px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200
            ${
              activeTab === "terms"
                ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            }
          `}
        >
          이용약관
        </button>

        <button
          onClick={() => setActiveTab("privacy")}
          className={`
            px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200
            ${
              activeTab === "privacy"
                ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            }
          `}
        >
          개인정보처리방침
        </button>
      </div>

      {/* 내용 영역 */}
      <div className="text-sm leading-relaxed text-zinc-300 space-y-10">

        {activeTab === "terms" && (
          <>
            <h1 className="text-3xl font-bold mb-10">이용약관</h1>

            <div className="space-y-10">

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">제1조 (목적)</h2>
                <p>
                  본 약관은 <strong>딥탁시스템(이하 “회사”)</strong>이 제공하는 노깡 STUDIO 서비스(이하 “서비스”)의 이용과 관련하여
                  회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                </p>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">제2조 (회사 정보)</h2>
                <p>상호명: 딥탁시스템</p>
                <p>대표자: 김정탁</p>
                <p>사업자등록번호: 460-03-03869</p>
                <p>통신판매업 신고번호: </p>
                <p>사업장 주소: </p>
                <p>이메일: </p>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">제3조 (서비스의 내용)</h2>
                <p>회사는 AI 기반 영상 제작 소프트웨어 및 관련 웹 서비스를 제공합니다.</p>
                <p>서비스는 웹사이트 및 다운로드형 프로그램을 포함합니다.</p>
                <p>서비스의 기능, 요금제 및 정책은 운영상 필요에 따라 변경될 수 있습니다.</p>
                <p>무료 플랜은 유료 계약이 아니며, 정책에 따라 변경 또는 종료될 수 있습니다.</p>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">제4조 (회원가입 및 계정 관리)</h2>
                <p>회원은 Google 로그인을 통해 가입할 수 있습니다.</p>
                <p>회원은 본인의 이메일 정보를 기반으로 계정을 생성합니다.</p>
                <p>계정 정보 관리 및 보안 유지에 대한 책임은 회원 본인에게 있습니다.</p>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">제5조 (요금제 및 결제)</h2>
                <p>서비스는 무료 플랜과 유료 구독 플랜으로 구성됩니다.</p>
                <p>유료 플랜은 월 단위 자동결제 방식으로 운영됩니다.</p>
                <p>구독은 매월 동일한 날짜에 자동 갱신됩니다.</p>
                <p>회원은 다음 결제일 이전까지 언제든지 구독을 해지할 수 있으며, 해지 시 다음 결제일부터 자동결제가 이루어지지 않습니다.</p>
                <p>결제는 회사가 지정한 결제대행사를 통해 이루어집니다. (PG사: )</p>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">제6조 (환불 정책)</h2>
                <p>본 서비스는 디지털 콘텐츠 및 소프트웨어 형태로 제공됩니다.</p>
                <p>전자상거래법 제17조 제2항에 따라 서비스 이용이 개시된 이후에는 청약철회가 제한될 수 있습니다.</p>

                <div className="pl-4 space-y-2 mt-4">
                  <p className="font-medium text-white">7일 환불 조건</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>결제일로부터 7일 이내일 것</li>
                    <li>해당 결제 기간 동안 유료 기능 사용 기록이 전혀 없을 것</li>
                    <li>환불 신청 시 구독 해지를 완료할 것</li>
                  </ul>
                  <p>위 조건을 충족하는 경우 전액 환불됩니다.</p>
                </div>

                <div className="pl-4 space-y-2 mt-6">
                  <p className="font-medium text-white">환불 불가 사유</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>유료 기능을 1회 이상 사용한 경우</li>
                    <li>결제일로부터 7일이 경과한 경우</li>
                    <li>이용자의 귀책사유로 계정이 제한된 경우</li>
                  </ul>
                </div>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">제7조 (개인 API 키 사용)</h2>
                <p>본 서비스는 회원이 직접 입력한 외부 API 키를 통해 콘텐츠를 생성하는 구조입니다.</p>
                <p>API 사용에 따른 요금, 크레딧 소진, 한도 초과 등은 전적으로 회원의 책임입니다.</p>
                <p>회원의 API 설정 오류, 키 관리 부주의, 사용량 관리 미숙 등으로 발생한 손해에 대해 회사는 책임을 지지 않습니다.</p>
                <p>외부 API 제공자의 정책 변경, 요금 조정, 서비스 중단 등에 대해서도 회사는 책임을 부담하지 않습니다.</p>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">제8조 (생성 콘텐츠의 권리)</h2>
                <p>회원이 본인의 API 키를 이용하여 생성한 콘텐츠의 저작권은 원칙적으로 해당 회원에게 귀속됩니다.</p>
                <p>회사는 생성 콘텐츠에 대한 저작권을 주장하지 않습니다.</p>
                <p>생성 콘텐츠가 제3자의 권리를 침해하는 경우 그 책임은 회원에게 있습니다.</p>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">제9조 (서비스 이용 제한)</h2>
                <p>회사는 부정 사용 또는 약관 위반이 확인된 경우 서비스 이용을 제한할 수 있습니다.</p>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">제10조 (약관의 변경)</h2>
                <p>회사는 관련 법령을 위반하지 않는 범위에서 본 약관을 변경할 수 있습니다.</p>
                <p>약관 변경 시 시행일 및 변경 사유를 사전에 공지합니다.</p>
              </section>

              <section className="pb-8">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">제11조 (책임의 제한)</h2>
                <p>회사는 천재지변, 서버 장애 등 불가항력적 사유로 인한 손해에 대해 책임을 지지 않습니다.</p>
                <p>고의 또는 중대한 과실이 없는 한 간접적 손해에 대해 책임을 부담하지 않습니다.</p>
                <p className="mt-4">본 약관은 대한민국 법률을 따르며, 분쟁 발생 시 회사 소재지 관할 법원을 전속 관할로 합니다.</p>
              </section>

            </div>
          </>
        )}

        {activeTab === "privacy" && (
          <>
            <h1 className="text-3xl font-bold mb-10">개인정보처리방침</h1>

            <div className="space-y-10">

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">1. 수집하는 개인정보 항목</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>이메일 주소</li>
                  <li>Firebase UID</li>
                  <li>기기 식별자 (deviceId)</li>
                  <li>서비스 이용 기록 (플랜, 사용량, 접속 일시 등)</li>
                  <li>접속 IP, 브라우저 정보 등 자동 수집 정보</li>
                </ul>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">2. 수집 및 이용 목적</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>회원 식별 및 계정 관리</li>
                  <li>서비스 제공 및 요금제 운영</li>
                  <li>무료 이용 제한 관리</li>
                  <li>부정 사용 방지</li>
                  <li>고객 문의 대응</li>
                </ul>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">3. 보관 및 파기</h2>
                <p>회원 탈퇴 시 개인정보는 즉시 삭제됩니다.</p>
                <p>
                  단, 부정 이용 방지를 위해 이메일 주소는 SHA-256 방식으로 암호화되어
                  최대 30일간 보관 후 자동 삭제됩니다.
                </p>

                <p className="font-medium text-white mt-4">
                  관련 법령에 따른 보관 기간
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>계약 또는 청약철회 기록: 5년</li>
                  <li>대금결제 및 재화공급 기록: 5년</li>
                  <li>소비자 불만 및 분쟁 처리 기록: 3년</li>
                </ul>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">4. 제3자 제공 및 해외 이전</h2>
                <p>회사는 원칙적으로 개인정보를 외부에 제공하지 않습니다.</p>
                <p>서비스 운영을 위해 다음 서비스를 이용합니다.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Google Firebase (Google LLC)</li>
                  <li>Vercel</li>
                  <li>결제대행사(PG사: )</li>
                </ul>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">5. 개인정보 처리 위탁</h2>
                <p>Google LLC (Firebase)</p>
              </section>

              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">6. 이용자의 권리</h2>
                <p>이용자는 언제든지 회원 탈퇴를 통해 개인정보 삭제를 요청할 수 있습니다.</p>
              </section>

              <section className="pb-8">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">7. 개인정보 보호책임자</h2>
                <p>성명: 김정탁</p>
                <p>이메일: </p>
                <p>연락처: </p>
              </section>

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default LegalPage;