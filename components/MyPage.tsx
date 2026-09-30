import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Calendar,
  ArrowRight,
  ShieldCheck,
  LogOut,
  Trash2,
  ExternalLink,
  MessageSquare,
  Activity,
} from "lucide-react";

import {
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../src/firebase";
import { createPortal } from "react-dom";

interface MyPageProps {
  onLogout: () => void;
}

type Credits = {
  script?: number;
  video?: number;
};

type UserDoc = {
  createdAt?: any;
  status?: string;
  email?: string;
  emailLocked?: boolean;
};

function limit3(value?: number) {
  if (value === undefined || value === null) {
    return "-";
  }

  const s = String(value);

  return s.length > 3 ? s.slice(0, 4) : s;
}

function fmtDateTimeKR(d: Date | null) {
  if (!d) return "-";

  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

function tsToDate(ts: any): Date | null {
  try {
    if (!ts) return null;

    if (typeof ts.toDate === "function") {
      return ts.toDate();
    }

    return null;
  } catch {
    return null;
  }
}

function providerLabel(providerId?: string) {
  switch (providerId) {
    case "password":
      return "Email";

    case "google.com":
      return "Google";

    case "apple.com":
      return "Apple";

    default:
      return providerId || "-";
  }
}

const MyPage: React.FC<MyPageProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<any>(null);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);

  const [deviceCredits, setDeviceCredits] = useState<Credits>({});
  const [deviceResetAt, setDeviceResetAt] = useState<any>(null);

  const [sendingReset, setSendingReset] = useState(false);
  const [showPwResetModal, setShowPwResetModal] = useState(false);

  const [pwResetResult, setPwResetResult] = useState<
    "success" | "error" | null
  >(null);

  const [editEmail, setEditEmail] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /*
   * 디바이스 ID 생성
   */
  useEffect(() => {
    if ((window as any).NOGGANG_DEVICE?.get) {
      return;
    }

    const KEY = "NOGGANG_DEVICE_ID";

    let deviceId = localStorage.getItem(KEY);

    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem(KEY, deviceId);
    }

    (window as any).NOGGANG_DEVICE = {
      get: async () => deviceId,
    };
  }, []);

  /*
   * 로그인 상태 + 사용자 정보 + 사용량
   */
  useEffect(() => {
    let unsubUser: (() => void) | null = null;
    let unsubDevice: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u || null);

      if (!u) {
        setUserDoc(null);
        setDeviceCredits({});
        setDeviceResetAt(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      const userRef = doc(db, "users", u.uid);

      unsubUser = onSnapshot(
        userRef,
        async (snap) => {
          if (!snap.exists()) {
            setUserDoc(null);
          } else {
            setUserDoc(snap.data() as UserDoc);
          }

          const deviceApi = (window as any).NOGGANG_DEVICE;

          let deviceId: string | null = null;

          if (
            deviceApi &&
            typeof deviceApi.get === "function"
          ) {
            deviceId = await deviceApi.get();
          } else {
            deviceId = localStorage.getItem(
              "NOGGANG_DEVICE_ID"
            );
          }

          if (!deviceId) {
            setDeviceCredits({});
            setDeviceResetAt(null);
            setLoading(false);
            return;
          }

          const deviceRef = doc(
            db,
            "deviceUsage",
            deviceId
          );

          if (unsubDevice) {
            unsubDevice();
            unsubDevice = null;
          }

          unsubDevice = onSnapshot(
            deviceRef,
            (dSnap) => {
              if (!dSnap.exists()) {
                setDeviceCredits({});
                setDeviceResetAt(null);
                setLoading(false);
                return;
              }

              const data = dSnap.data();

              setDeviceCredits({
                script:
                  data.credits?.script ??
                  data.script,
                video:
                  data.credits?.video ??
                  data.video,
              });

              setDeviceResetAt(
                data.resetAt ?? null
              );

              setLoading(false);
            },
            (error) => {
              console.error(
                "deviceUsage 불러오기 오류:",
                error
              );

              setDeviceCredits({});
              setDeviceResetAt(null);
              setLoading(false);
            }
          );
        },
        (error) => {
          console.error(
            "사용자 정보 불러오기 오류:",
            error
          );

          setLoading(false);
        }
      );
    });

    return () => {
      unsubAuth();
      unsubUser?.();
      unsubDevice?.();
    };
  }, []);

  const credits = deviceCredits;

  const resetAtDate =
    tsToDate(deviceResetAt);

  const createdAtDate =
    tsToDate(userDoc?.createdAt) ||
    (user?.metadata?.creationTime
      ? new Date(user.metadata.creationTime)
      : null);

  const providerId = useMemo(() => {
    const pid =
      user?.providerData?.[0]?.providerId;

    return (
      pid ||
      (user?.isAnonymous
        ? "anonymous"
        : undefined)
    );
  }, [user]);

  const email =
    userDoc?.email ||
    user?.email ||
    "-";

  const emailLocked =
    userDoc?.emailLocked === true;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto space-y-12 pb-24 px-4">

      {/* 제목 */}
      <div className="text-center md:text-left">
        <h2 className="text-4xl font-black mb-3">
          내정보
        </h2>

        <p className="text-zinc-500 font-medium">
          서비스 이용 현황과 계정 설정을 한곳에서 관리하세요.
        </p>
      </div>

      {/* 로그인 안 됨 */}
      {!loading && !user && (
        <section className="bg-gradient-to-r from-zinc-900 to-zinc-800/50 border border-yellow-400/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">

          <h3 className="text-xl font-black text-white mb-2">
            로그인이 필요합니다
          </h3>

          <p className="text-zinc-400 font-medium">
            로그인 후 사용량 및 계정 정보를 확인할 수 있습니다.
          </p>

        </section>
      )}

      {/* 로딩 */}
      {loading && (
        <section className="bg-gradient-to-r from-zinc-900 to-zinc-800/50 border border-yellow-400/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">

          <h3 className="text-xl font-black text-white mb-2">
            불러오는 중…
          </h3>

          <p className="text-zinc-400 font-medium">
            계정 정보를 가져오고 있습니다.
          </p>

        </section>
      )}

      {/* 로그인 상태 */}
      {!loading && user && (
        <div className="flex flex-col gap-10">

          {/* 이용 현황 */}
          <section className="bg-gradient-to-r from-zinc-900 to-zinc-800/50 border border-yellow-400/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">

            <div className="relative z-10">

              <div className="space-y-6">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400">
                    <Activity className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-black text-white">
                    서비스 이용 현황
                  </h3>

                </div>

                <div>

                  <div className="flex items-center gap-3 mb-2">

                    <span className="text-3xl md:text-4xl font-black text-yellow-400 tracking-tight">
                      무료 이용 중
                    </span>

                  </div>

                  <p className="text-zinc-400 font-medium text-base">
                    노깡 STUDIO를 무료로 이용하고 있습니다.
                  </p>

                  <p className="text-zinc-500 text-sm mt-3 flex items-center gap-2">

                    <Calendar className="w-4 h-4" />

                    사용량 리셋 예정일:

                    <span className="text-zinc-300 font-bold">
                      {fmtDateTimeKR(
                        resetAtDate
                      )}
                    </span>

                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">

                    <div className="bg-black/20 border border-zinc-800/60 rounded-2xl p-4">

                      <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">
                        대본분석
                      </div>

                      <div className="text-2xl font-black text-zinc-100 mt-1">
                        {limit3(
                          credits.script
                        )}
                      </div>

                    </div>

                    <div className="bg-black/20 border border-zinc-800/60 rounded-2xl p-4">

                      <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">
                        영상저장
                      </div>

                      <div className="text-2xl font-black text-zinc-100 mt-1">
                        {limit3(
                          credits.video
                        )}
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            </div>

            <img
              src="/logo.png"
              alt="NOGGANG Logo"
              className="
                absolute
                -right-12
                -bottom-1
                w-72
                h-72
                opacity-[0.09]
                rotate-12
                pointer-events-none
                select-none
                group-hover:scale-110
                transition-transform
                duration-1000
              "
            />

          </section>

          {/* 기본 정보 */}
          <section className="bg-gradient-to-r from-zinc-900 to-zinc-800/50 border border-yellow-400/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">

            <div className="flex items-center gap-3 mb-10">

              <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400">
                <User className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-black text-white">
                기본 정보
              </h3>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 items-center">

              {/* 이메일 */}
              <div className="space-y-1">

                <p className="text-sm text-zinc-400 font-bold">
                  가입 이메일
                </p>

                {email === "-" &&
                !emailLocked ? (
                  <div className="flex items-center gap-3 max-w-md">

                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) =>
                        setEditEmail(
                          e.target.value
                        )
                      }
                      placeholder="이메일 입력 (1회만 가능)"
                      className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-base text-white placeholder:text-zinc-500"
                    />

                    <button
                      disabled={
                        savingEmail ||
                        !editEmail
                      }
                      onClick={async () => {
                        try {
                          setSavingEmail(
                            true
                          );

                          await updateDoc(
                            doc(
                              db,
                              "users",
                              user.uid
                            ),
                            {
                              email:
                                editEmail,
                              emailLocked:
                                true,
                            }
                          );

                          setUserDoc(
                            (prev) =>
                              prev
                                ? {
                                    ...prev,
                                    email:
                                      editEmail,
                                    emailLocked:
                                      true,
                                  }
                                : prev
                          );

                          setEditEmail(
                            ""
                          );
                        } catch (error) {
                          console.error(
                            "이메일 저장 오류:",
                            error
                          );

                          alert(
                            "이메일 저장에 실패했습니다."
                          );
                        } finally {
                          setSavingEmail(
                            false
                          );
                        }
                      }}
                      className="px-4 py-2 bg-yellow-400 text-black text-sm font-black rounded-lg disabled:opacity-40 whitespace-nowrap shrink-0"
                    >
                      저장
                    </button>

                  </div>
                ) : (
                  <p className="font-bold text-zinc-200 text-lg">
                    {email}
                  </p>
                )}

                {emailLocked && (
                  <p className="text-[11px] text-zinc-500 mt-1">
                    이메일은 1회만 설정 가능합니다.
                  </p>
                )}

              </div>

              {/* 가입일 */}
              <div className="space-y-1">

                <p className="text-sm text-zinc-400 font-bold">
                  가입일
                </p>

                <p className="font-bold text-zinc-200 text-lg">
                  {createdAtDate
                    ? new Intl.DateTimeFormat(
                        "ko-KR",
                        {
                          dateStyle:
                            "medium",
                        }
                      ).format(
                        createdAtDate
                      )
                    : "-"}
                </p>

              </div>

              {/* 로그인 제공자 */}
              <div className="space-y-1">

                <p className="text-sm text-zinc-400 font-bold">
                  로그인 제공자
                </p>

                <div className="flex items-center gap-2 mt-1">

                  <span className="px-3 py-1 bg-zinc-800 rounded-lg text-[10px] font-black text-zinc-400 uppercase tracking-widest border border-zinc-700/30">
                    {providerLabel(
                      providerId
                    )}
                  </span>

                </div>

              </div>

            </div>

          </section>

          {/* 고객지원 */}
          <section className="bg-gradient-to-r from-zinc-900 to-zinc-800/50 border border-yellow-400/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

              <div className="space-y-4">

                <h3 className="text-xl font-black text-white flex items-center gap-3">

                  <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400">

                    <MessageSquare className="w-5 h-5" />

                  </div>

                  고객지원

                </h3>

                <div className="flex flex-wrap gap-4 pt-2">

                  <button
                    onClick={() =>
                      navigate(
                        "/legal?type=terms"
                      )
                    }
                    className="text-sm text-zinc-500 hover:text-yellow-400 transition-colors font-bold flex items-center gap-1.5 border-b border-transparent hover:border-yellow-400/20 pb-1"
                  >
                    이용약관

                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        "/legal?type=privacy"
                      )
                    }
                    className="text-sm text-zinc-500 hover:text-yellow-400 transition-colors font-bold flex items-center gap-1.5 border-b border-transparent hover:border-yellow-400/20 pb-1"
                  >
                    개인정보 처리방침

                    <ArrowRight className="w-3 h-3" />
                  </button>

                </div>
              </div>

              <button
                onClick={() =>
                  navigate("/support")
                }
                className="px-8 py-4 bg-zinc-800 text-zinc-200 font-black rounded-2xl text-sm hover:bg-zinc-700 transition-all flex items-center justify-center gap-3 group"
              >
                문의하기

                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-yellow-400" />
              </button>

            </div>

          </section>

          {/* 보안 및 관리 */}
          <section className="bg-gradient-to-r from-zinc-900 to-zinc-800/50 border border-yellow-400/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">

            <div className="flex items-center gap-3 mb-8">

              <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-black text-white">
                보안 및 관리
              </h3>

            </div>

            <div className="flex flex-wrap items-center gap-4">

              {/* 비밀번호 변경 */}
              <button
                disabled={sendingReset}
                onClick={async () => {
                  const currentUser =
                    auth.currentUser;

                  if (
                    !currentUser ||
                    !currentUser.email
                  ) {
                    setPwResetResult(
                      "error"
                    );

                    setShowPwResetModal(
                      true
                    );

                    return;
                  }

                  const currentProvider =
                    currentUser
                      .providerData?.[0]
                      ?.providerId;

                  if (
                    currentProvider !==
                    "password"
                  ) {
                    setPwResetResult(
                      "error"
                    );

                    setShowPwResetModal(
                      true
                    );

                    return;
                  }

                  try {
                    setSendingReset(
                      true
                    );

                    await sendPasswordResetEmail(
                      auth,
                      currentUser.email
                    );

                    setPwResetResult(
                      "success"
                    );
                  } catch {
                    setPwResetResult(
                      "error"
                    );
                  } finally {
                    setSendingReset(
                      false
                    );

                    setShowPwResetModal(
                      true
                    );
                  }
                }}
                className="px-6 py-3 bg-zinc-800/50 text-zinc-300 font-bold rounded-xl text-xs hover:bg-zinc-800 hover:text-white transition-all disabled:opacity-50"
              >
                {sendingReset
                  ? "메일 발송 중..."
                  : "비밀번호 변경"}
              </button>

              {/* 로그아웃 */}
              <button
                onClick={onLogout}
                className="px-6 py-3 bg-zinc-800/50 text-zinc-300 font-bold rounded-xl text-xs hover:bg-red-500/10 hover:text-red-500 transition-all flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />

                로그아웃
              </button>

              <div className="h-4 w-px bg-zinc-800 mx-2 ml-auto" />

              {/* 계정 삭제 */}
              <button
                onClick={() =>
                  setShowDeleteModal(
                    true
                  )
                }
                className="px-6 py-3 text-zinc-600 font-black text-[13px] uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />

                계정 삭제
              </button>

            </div>

          </section>

        </div>
      )}

      {/* 비밀번호 변경 결과 모달 */}
      {showPwResetModal &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-center justify-center">

            <div className="bg-zinc-900 border border-yellow-400/30 rounded-[2rem] px-8 py-7 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95">

              <h3 className="text-xl font-black text-white mb-3">
                비밀번호 변경
              </h3>

              {pwResetResult ===
              "success" ? (
                <p className="text-zinc-300 text-sm leading-relaxed">
                  비밀번호 재설정 메일을
                  발송했습니다.
                  <br />
                  메일함을 확인해주세요.
                </p>
              ) : (
                <p className="text-red-400 text-sm leading-relaxed">
                  이메일 로그인 계정만
                  비밀번호 변경이 가능합니다.
                </p>
              )}

              <div className="mt-6">

                <button
                  onClick={() => {
                    setShowPwResetModal(
                      false
                    );

                    setPwResetResult(
                      null
                    );
                  }}
                  className="w-full py-3 rounded-xl bg-yellow-400 text-black font-black hover:bg-yellow-300 transition"
                >
                  확인
                </button>

              </div>

            </div>

          </div>,
          document.body
        )}

      {/* 계정 삭제 모달 */}
      {showDeleteModal &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm backdrop-saturate-125 flex items-center justify-center">

            <div className="bg-zinc-900 border border-red-500/30 rounded-[2rem] px-8 py-7 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95">

              <h3 className="text-2xl font-black text-white mb-3">
                정말 계정을 삭제할까요?
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed">
                계정을 삭제하면 모든 사용
                기록이 즉시 제거되며,
                <br />

                <span className="text-red-400 font-bold">
                  삭제된 계정은 복구할 수
                  없습니다.
                </span>
              </p>

              <div className="mt-8 flex gap-3">

                <button
                  disabled={deleting}
                  onClick={() =>
                    setShowDeleteModal(
                      false
                    )
                  }
                  className="flex-1 py-3 rounded-xl bg-zinc-800 text-zinc-300 font-bold hover:bg-zinc-700 transition"
                >
                  취소
                </button>

                <button
                  disabled={deleting}
                  onClick={async () => {
                    setDeleting(true);

                    try {
                      const currentUser =
                        auth.currentUser;

                      if (!currentUser) {
                        alert(
                          "로그인 상태가 아닙니다."
                        );

                        return;
                      }

                      let token = "";

                      try {
                        token =
                          await currentUser.getIdToken();
                      } catch {
                        alert(
                          "세션이 만료되었습니다. 다시 로그인 후 계정 삭제를 진행해주세요."
                        );

                        setShowDeleteModal(
                          false
                        );

                        return;
                      }

                      const res =
                        await fetch(
                          "https://us-central1-noggang-studio.cloudfunctions.net/use/delete-account",
                          {
                            method:
                              "POST",

                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );

                      let json: any = {};

                      try {
                        json =
                          await res.json();
                      } catch {}

                      if (
                        !res.ok ||
                        json.ok !==
                          true
                      ) {
                        alert(
                          "계정 삭제에 실패했습니다. 잠시 후 다시 시도해주세요."
                        );

                        return;
                      }

                      await auth.signOut();

                      navigate("/");
                    } catch (error) {
                      console.error(
                        "계정 삭제 오류:",
                        error
                      );

                      alert(
                        "계정 삭제에 실패했습니다. 잠시 후 다시 시도해주세요."
                      );
                    } finally {
                      setDeleting(false);
                    }
                  }}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-black hover:bg-red-600 transition disabled:opacity-50"
                >
                  {deleting
                    ? "삭제 중..."
                    : "계정 삭제"}
                </button>

              </div>

            </div>

          </div>,
          document.body
        )}

    </div>
  );
};

export default MyPage;