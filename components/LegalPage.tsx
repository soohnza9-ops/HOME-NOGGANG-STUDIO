import React, { useState } from "react";

const LegalPage: React.FC = () => {
  const [activeTab, setActiveTab] =
    useState<"terms" | "privacy">("terms");

  return (
    <div className="max-w-4xl mx-auto text-white px-6 py-16">
      {/* 상단 탭 */}
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

      {/* 내용 */}
      <div className="text-sm leading-relaxed text-zinc-300 space-y-10">
        {/* =========================
            이용약관
        ========================== */}
        {activeTab === "terms" && (
          <>
            <h1 className="text-3xl font-bold mb-10 text-white">
              이용약관
            </h1>

            <div className="space-y-10">
              {/* 제1조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제1조 (목적)
                </h2>

                <p>
                  본 약관은 노깡 STUDIO(이하 “서비스”)의 이용과
                  관련하여 서비스 운영자와 이용자 간의 권리, 의무 및
                  책임사항을 규정함을 목적으로 합니다.
                </p>
              </section>

              {/* 제2조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제2조 (서비스의 내용)
                </h2>

                <div className="space-y-3">
                  <p>
                    서비스는 AI 기반 영상 제작을 지원하는 소프트웨어
                    및 관련 웹 기능을 제공합니다.
                  </p>

                  <p>
                    서비스는 웹사이트 및 다운로드형 프로그램을
                    포함할 수 있습니다.
                  </p>

                  <p>
                    현재 노깡 STUDIO 프로그램은 무료로 제공됩니다.
                  </p>

                  <p>
                    서비스는 이용자가 입력한 대본, 설정값, 외부 API
                    정보 등을 기반으로 콘텐츠 제작 과정을 지원하는
                    도구입니다.
                  </p>

                  <p>
                    서비스의 기능, 제공 범위, 이용 방법 및 지원되는
                    외부 서비스는 운영 또는 기술상의 필요에 따라
                    변경될 수 있습니다.
                  </p>
                </div>
              </section>

              {/* 제3조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제3조 (회원가입 및 계정 관리)
                </h2>

                <div className="space-y-3">
                  <p>
                    이용자는 이메일 또는 Google 로그인을 통해 서비스 계정을
                    생성할 수 있습니다.
                  </p>

                  <p>
                    계정 정보 및 로그인 수단의 관리와 보안 유지에 대한
                    책임은 이용자 본인에게 있습니다.
                  </p>

                  <p>
                    이용자는 본인의 계정을 타인에게 양도, 대여 또는
                    공유해서는 안 됩니다.
                  </p>

                  <p>
                    계정 공유, 관리 소홀 또는 인증정보 노출로 인해
                    발생하는 문제에 대한 책임은 이용자에게 있습니다.
                  </p>
                </div>
              </section>

              {/* 제4조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제4조 (외부 API 및 Google Cloud 이용)
                </h2>

                <div className="space-y-3">
                  <p>
                    서비스의 일부 기능은 이용자가 직접 등록한 Google
                    Cloud 또는 기타 외부 서비스의 API와 인증정보를
                    이용하여 작동합니다.
                  </p>

                  <p>
                    Google Cloud 프로젝트 생성, 결제 계정 등록,
                    API 활성화, 서비스 계정 생성, 인증정보 설정 및
                    기타 외부 서비스 설정은 이용자가 직접 수행하고
                    관리해야 합니다.
                  </p>

                  <p>
                    외부 API 사용에 따라 발생하는 이용료는 서비스
                    운영자가 부과하는 금액이 아니며, 해당 외부 서비스
                    제공자의 정책에 따라 이용자의 외부 서비스 계정에
                    직접 부과될 수 있습니다.
                  </p>

                  <p>
                    이용자는 본인의 Google Cloud 또는 기타 외부
                    서비스 계정의 사용량, 과금 내역, 예산, 할당량,
                    결제수단 및 자동결제 상태를 직접 확인하고
                    관리해야 합니다.
                  </p>

                  <p>
                    서비스 운영자는 이용자의 Google 계정 또는
                    Google Cloud 계정에서 발생하는 API 이용료를 대신
                    관리하거나 결제를 취소할 권한이 없습니다.
                  </p>
                </div>
              </section>

              {/* 제5조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제5조 (외부 서비스 정책 및 요금 변경)
                </h2>

                <div className="space-y-3">
                  <p>
                    Google을 포함한 외부 서비스 제공자는 자체 정책에
                    따라 API 가격, 무료 사용 범위, 할당량, 기능,
                    결제 방식 및 이용 조건을 변경할 수 있습니다.
                  </p>

                  <p>
                    이용자는 외부 서비스 이용 전과 이용 중 해당 서비스
                    제공자의 최신 이용정책, 가격, 할당량 및 결제조건을
                    직접 확인해야 합니다.
                  </p>

                  <p>
                    외부 서비스 제공자의 정책 또는 가격 변경으로 인해
                    기존에 무료였던 기능에 요금이 발생하거나 이용
                    비용이 증가할 수 있습니다.
                  </p>

                  <p>
                    외부 서비스의 정책 또는 요금 변경 이후에도
                    이용자가 해당 서비스를 계속 사용하는 경우 발생하는
                    비용은 이용자가 직접 확인하고 관리해야 합니다.
                  </p>

                  <p>
                    외부 서비스 제공자의 가격 변경, 정책 변경,
                    기능 변경, 할당량 변경, 서비스 중단 또는 장애는
                    서비스 운영자가 결정하거나 통제하는 사항이
                    아닙니다.
                  </p>
                </div>
              </section>

              {/* 제6조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제6조 (API 사용 비용 및 이용자의 관리 책임)
                </h2>

                <div className="space-y-3">
                  <p>
                    이용자는 프로그램 사용 전 본인이 사용하는 외부
                    API의 요금 체계와 과금 방식을 직접 확인해야 합니다.
                  </p>

                  <p>
                    프로그램에서 많은 양의 이미지, 음성 또는 기타
                    콘텐츠를 생성하는 경우 외부 API 사용량이 증가할 수
                    있으며 이에 따라 외부 API 이용료도 증가할 수
                    있습니다.
                  </p>

                  <p>
                    이용자는 필요한 경우 Google Cloud 등의 예산 알림,
                    사용량 모니터링 또는 기타 비용 관리 기능을 직접
                    설정해야 합니다.
                  </p>

                  <p>
                    예상보다 많은 API 요청이 발생하거나 이용자가
                    예상하지 못한 비용이 발생하지 않도록 사용량과
                    결제내역을 수시로 확인하는 것은 이용자의
                    책임입니다.
                  </p>

                  <p>
                    API 사용으로 발생한 비용, 자동 과금, 사용량 초과,
                    무료 한도 소진 및 외부 서비스의 가격 변경으로
                    발생한 비용에 대해서는 해당 외부 서비스 제공자의
                    정책이 적용됩니다.
                  </p>
                </div>
              </section>

              {/* 제7조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제7조 (API 키 및 인증정보 관리)
                </h2>

                <div className="space-y-3">
                  <p>
                    API 키, 서비스 계정 파일, 인증정보 및 외부 서비스
                    계정의 로그인 정보는 이용자가 직접 안전하게
                    관리해야 합니다.
                  </p>

                  <p>
                    이용자는 자신의 API 키 또는 인증정보를 제3자에게
                    제공하거나 공개해서는 안 됩니다.
                  </p>

                  <p>
                    인증정보가 외부에 노출되었거나 노출이 의심되는
                    경우 이용자는 즉시 해당 외부 서비스에서 키 폐기,
                    재발급 또는 권한 변경 등 필요한 조치를 직접
                    수행해야 합니다.
                  </p>

                  <p>
                    이용자의 API 키 관리 소홀, 계정 공유, 인증정보
                    노출 또는 보안 설정 미흡으로 발생한 사용량과
                    비용은 이용자가 직접 관리해야 합니다.
                  </p>
                </div>
              </section>

              {/* 제8조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제8조 (생성 콘텐츠)
                </h2>

                <div className="space-y-3">
                  <p>
                    서비스는 이용자의 요청에 따라 영상, 이미지, 음성,
                    자막, 문구 등의 콘텐츠 생성을 지원할 수 있습니다.
                  </p>

                  <p>
                    생성 결과물의 내용, 품질, 정확성, 완전성 및 특정
                    목적에 대한 적합성은 보장되지 않습니다.
                  </p>

                  <p>
                    이용자가 생성 콘텐츠를 게시, 배포, 판매, 광고,
                    전송 또는 기타 목적으로 사용하는 경우 그 사용에
                    대한 판단과 책임은 이용자에게 있습니다.
                  </p>

                  <p>
                    생성 콘텐츠에 적용되는 권리는 관련 법령 및
                    콘텐츠 생성에 사용된 외부 AI 서비스 제공자의
                    정책에 따릅니다.
                  </p>

                  <p>
                    서비스 운영자는 이용자가 생성한 콘텐츠에 대한
                    권리를 별도로 주장하지 않습니다.
                  </p>
                </div>
              </section>

              {/* 제9조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제9조 (저작권 및 제3자의 권리)
                </h2>

                <div className="space-y-3">
                  <p>
                    이용자는 서비스에 입력하는 대본, 이미지, 음원,
                    영상, 음성, 문서 및 기타 자료를 사용할 수 있는
                    적법한 권한을 확보해야 합니다.
                  </p>

                  <p>
                    이용자는 생성 콘텐츠가 저작권, 상표권, 초상권,
                    개인정보, 명예 또는 기타 제3자의 권리를 침해하지
                    않는지 직접 확인해야 합니다.
                  </p>

                  <p>
                    이용자가 입력하거나 생성한 콘텐츠로 인해
                    제3자와 분쟁이 발생하는 경우 해당 콘텐츠를
                    사용한 이용자가 이에 대한 책임을 부담합니다.
                  </p>
                </div>
              </section>

              {/* 제10조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제10조 (서비스 이용 제한)
                </h2>

                <p className="mb-4">
                  다음에 해당하는 경우 서비스 이용이 제한되거나
                  계정이 정지될 수 있습니다.
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    타인의 API 키 또는 인증정보를 무단으로 사용하는
                    행위
                  </li>

                  <li>
                    관련 법령을 위반하는 목적으로 서비스를 사용하는
                    행위
                  </li>

                  <li>
                    외부 API 제공자의 정책을 위반하는 방식으로
                    서비스를 사용하는 행위
                  </li>

                  <li>
                    서비스에 비정상적이거나 과도한 요청을 반복적으로
                    보내는 행위
                  </li>

                  <li>
                    서비스의 정상적인 운영을 방해하는 행위
                  </li>

                  <li>
                    서비스 또는 프로그램을 악의적으로 변조하거나
                    운영을 방해하는 행위
                  </li>

                  <li>
                    기타 본 약관을 중대하게 위반하는 행위
                  </li>
                </ul>
              </section>

              {/* 제11조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제11조 (서비스의 변경 및 중단)
                </h2>

                <div className="space-y-3">
                  <p>
                    서비스 운영자는 기능 개선, 시스템 점검, 서버
                    장애, 보안 문제 또는 외부 API 변경 등 필요한
                    경우 서비스의 전부 또는 일부를 변경하거나
                    중단할 수 있습니다.
                  </p>

                  <p>
                    외부 API의 변경으로 기존 기능을 유지하기 어려운
                    경우 해당 기능이 변경되거나 제거될 수 있습니다.
                  </p>

                  <p>
                    예정된 중요한 서비스 변경이나 중단 사항은 가능한
                    범위에서 서비스 내 공지 등을 통해 안내합니다.
                  </p>
                </div>
              </section>

              {/* 제12조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제12조 (데이터 및 백업)
                </h2>

                <div className="space-y-3">
                  <p>
                    이용자가 프로그램을 통해 생성한 영상, 이미지,
                    음성 및 기타 결과물의 보관과 백업은 이용자의
                    책임입니다.
                  </p>

                  <p>
                    중요한 결과물이나 프로젝트 자료는 이용자가 직접
                    별도의 저장공간에 백업하는 것을 권장합니다.
                  </p>

                  <p>
                    프로그램 삭제, 컴퓨터 변경, 저장장치 문제 또는
                    이용자 환경의 문제로 데이터가 손실될 수 있으므로
                    이용자는 필요한 데이터를 직접 관리해야 합니다.
                  </p>
                </div>
              </section>

              {/* 제13조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제13조 (책임의 제한)
                </h2>

                <div className="space-y-3">
                  <p>
                    서비스 운영자는 서비스의 정상적인 제공을 위해
                    합리적인 범위에서 노력합니다.
                  </p>

                  <p>
                    이용자의 설정 오류, 프로그램 사용 방법 미숙지,
                    API 설정 오류, 인증정보 관리 소홀, 외부 서비스
                    이용조건 미확인 등 이용자의 사유로 발생한 문제에
                    대해서는 이용자가 책임을 부담합니다.
                  </p>

                  <p>
                    Google Cloud 및 기타 외부 API에서 발생한 이용료,
                    자동 과금, 할당량 초과, 사용량 증가 또는 외부
                    서비스 정책 변경에 따른 비용에 대해서는 이용자가
                    직접 확인하고 관리해야 합니다.
                  </p>

                  <p>
                    외부 API 제공자의 시스템 장애, 정책 변경, 요금
                    변경, 기능 변경, 서비스 종료 또는 네트워크 장애 등
                    서비스 운영자가 직접 통제할 수 없는 사유로
                    발생하는 문제에 대해서는 해당 외부 서비스
                    제공자의 정책이 적용됩니다.
                  </p>

                  <p>
                    천재지변, 통신망 장애, 외부 서버 장애 등
                    합리적으로 통제하기 어려운 사유로 서비스가
                    중단될 수 있습니다.
                  </p>

                  <p>
                    다만 서비스 운영자의 고의 또는 중대한 과실로
                    발생한 손해에 대한 책임은 관련 법령에 따릅니다.
                  </p>
                </div>
              </section>

              {/* 제14조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제14조 (미리보기와 최종 결과물의 차이)
                </h2>

                <div className="space-y-3">
                  <p>
                    프로그램에서 제공되는 미리보기 화면은 이용자의
                    작업 편의를 위한 참고용 기능입니다.
                  </p>

                  <p>
                    미리보기 환경과 최종 영상 렌더링 또는 인코딩
                    환경의 차이로 인해 폰트 크기, 굵기, 줄 간격,
                    자막 위치, 여백, 애니메이션, 이미지 크기 또는
                    줌 비율 등에서 일부 차이가 발생할 수 있습니다.
                  </p>

                  <p>
                    이용자는 중요한 콘텐츠를 배포하거나 게시하기 전에
                    최종 생성된 결과물을 직접 확인해야 합니다.
                  </p>
                </div>
              </section>

              {/* 제15조 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제15조 (약관의 변경)
                </h2>

                <div className="space-y-3">
                  <p>
                    서비스 운영자는 관련 법령을 위반하지 않는 범위에서
                    본 약관을 변경할 수 있습니다.
                  </p>

                  <p>
                    약관이 변경되는 경우 시행일 및 주요 변경 내용을
                    서비스 내 공지 등을 통해 안내할 수 있습니다.
                  </p>
                </div>
              </section>

              {/* 제16조 */}
              <section className="pb-8">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  제16조 (문의)
                </h2>

                <p>
                  서비스 이용과 관련한 문의는 아래 이메일을 통해
                  접수할 수 있습니다.
                </p>

                <p className="mt-3 text-white">
                  noggang.studio@gmail.com
                </p>
              </section>
            </div>
          </>
        )}

        {/* =========================
            개인정보처리방침
        ========================== */}
        {activeTab === "privacy" && (
          <>
            <h1 className="text-3xl font-bold mb-10 text-white">
              개인정보처리방침
            </h1>

            <div className="space-y-10">
              {/* 1 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  1. 수집하는 개인정보
                </h2>

                <p className="mb-4">
                  서비스 이용 과정에서 다음 정보가 수집될 수 있습니다.
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Google 로그인 이메일 주소</li>
                  <li>Firebase UID</li>
                  <li>기기 식별 정보</li>
                  <li>서비스 접속 및 이용 기록</li>
                  <li>오류 및 서비스 동작 기록</li>
                  <li>
                    IP 주소, 브라우저 정보 등 서비스 이용 과정에서
                    자동으로 생성되는 정보
                  </li>
                </ul>
              </section>

              {/* 2 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  2. 개인정보 이용 목적
                </h2>

                <ul className="list-disc pl-6 space-y-2">
                  <li>회원 식별 및 로그인 기능 제공</li>
                  <li>서비스 및 프로그램 기능 제공</li>
                  <li>계정 관리</li>
                  <li>서비스 부정 이용 및 악용 방지</li>
                  <li>오류 확인 및 서비스 안정성 개선</li>
                  <li>고객 문의 대응</li>
                </ul>
              </section>

              {/* 3 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  3. Google API 인증정보
                </h2>

                <div className="space-y-3">
                  <p>
                    프로그램 기능 이용을 위해 이용자가 Google API
                    인증정보 또는 서비스 계정 정보를 직접 등록할 수
                    있습니다.
                  </p>

                  <p>
                    이용자는 본인의 Google API 인증정보와 서비스 계정
                    파일을 안전하게 관리해야 합니다.
                  </p>

                  <p>
                    외부 API 계정, API 키, Google Cloud 프로젝트 및
                    결제 정보의 관리 책임은 해당 계정을 소유한
                    이용자에게 있습니다.
                  </p>
                </div>
              </section>

              {/* 4 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  4. 생성 콘텐츠
                </h2>

                <div className="space-y-3">
                  <p>
                    이용자가 프로그램에서 직접 생성하거나 로컬
                    컴퓨터에 저장한 영상, 이미지, 음성 등의 콘텐츠는
                    이용자가 직접 관리합니다.
                  </p>

                  <p>
                    프로그램의 구체적인 동작 방식에 따라 외부 AI API에
                    콘텐츠 생성에 필요한 데이터가 전송될 수 있으며,
                    외부 서비스에서의 데이터 처리는 해당 서비스
                    제공자의 개인정보처리방침 및 이용정책에 따릅니다.
                  </p>
                </div>
              </section>

              {/* 5 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  5. 개인정보 보관 및 파기
                </h2>

                <div className="space-y-3">
                  <p>
                    개인정보는 수집 및 이용 목적이 달성되거나 회원
                    탈퇴 등으로 더 이상 보관할 필요가 없는 경우
                    지체 없이 파기하는 것을 원칙으로 합니다.
                  </p>

                  <p>
                    다만 관련 법령에 따라 일정 기간 보관해야 하는
                    정보가 있는 경우 해당 법령에서 정한 기간 동안
                    보관할 수 있습니다.
                  </p>
                </div>
              </section>

              {/* 6 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  6. 외부 서비스 이용
                </h2>

                <p className="mb-4">
                  서비스 제공을 위해 다음과 같은 외부 서비스를 이용할
                  수 있습니다.
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Google Firebase</li>
                  <li>Google Cloud 및 Google API</li>
                  <li>Vercel</li>
                </ul>

                <p className="mt-4">
                  각 외부 서비스에서 처리되는 정보는 해당 서비스
                  제공자의 개인정보처리방침 및 정책에 따를 수 있습니다.
                </p>
              </section>

              {/* 7 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  7. 개인정보의 제3자 제공
                </h2>

                <p>
                  서비스 운영자는 원칙적으로 이용자의 개인정보를
                  이용자의 동의 없이 제3자에게 판매하거나 임의로
                  제공하지 않습니다.
                </p>
              </section>

              {/* 8 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  8. 이용자의 권리
                </h2>

                <div className="space-y-3">
                  <p>
                    이용자는 자신의 개인정보에 대해 열람, 정정 또는
                    삭제를 요청할 수 있습니다.
                  </p>

                  <p>
                    회원 탈퇴 기능이 제공되는 경우 이용자는 이를 통해
                    계정 삭제를 요청할 수 있습니다.
                  </p>

                  <p>
                    개인정보 관련 요청은 서비스 문의 이메일을 통해
                    접수할 수 있습니다.
                  </p>
                </div>
              </section>

              {/* 9 */}
              <section className="pb-8 border-b border-zinc-800">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  9. 개인정보 보호
                </h2>

                <p>
                  서비스 운영자는 이용자의 개인정보가 분실, 도난,
                  유출 또는 훼손되지 않도록 합리적인 범위에서 필요한
                  보호조치를 적용합니다.
                </p>
              </section>

              {/* 10 */}
              <section className="pb-8">
                <h2 className="text-xl font-bold tracking-tight text-white mb-4">
                  10. 개인정보 관련 문의
                </h2>

                <p>
                  개인정보 처리와 관련한 문의는 아래 이메일로 접수할
                  수 있습니다.
                </p>

                <p className="mt-3 text-white">
                  noggang.studio@gmail.com
                </p>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LegalPage;