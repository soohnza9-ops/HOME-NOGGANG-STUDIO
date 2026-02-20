import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  ChevronDown,
  AlertTriangle,
  Eye,
  EyeOff,
  Save,
  Trash2
} from "lucide-react";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../src/firebase";

type Notice = {
  id: number;
  title: string;
  content: string;
  isImportant: boolean;
  isPublic: boolean;
  date: string;
  time: string;
};

const mockData: Notice[] = [
  {
    id: 1,
    title: "서비스 점검 안내",
    content: "서버 점검이 예정되어 있습니다.",
    isImportant: true,
    isPublic: true,
    date: "2026-02-02",
    time: "14:32"
  }
];

const AdminNoticePage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>(mockData);
  const [openId, setOpenId] = useState<number | null>(null);
  const [editNotice, setEditNotice] = useState<Notice | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const createRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    isImportant: false,
    isPublic: true
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isCreating &&
        createRef.current &&
        !createRef.current.contains(e.target as Node)
      ) {
        setIsCreating(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isCreating]);

  const handleCreate = async () => {
    if (!form.title || !form.content) return;

    const now = new Date();

    const newNotice: Notice = {
      id: Date.now(),
      ...form,
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 5)
    };

    try {
      await addDoc(collection(db, "notices"), {
        title: form.title,
        content: form.content,
        createdAt: serverTimestamp(),
        isPinned: form.isImportant,
        isVisible: form.isPublic
      });
    } catch (error) {
      console.error("Firestore 저장 실패:", error);
    }

    setNotices(prev => [newNotice, ...prev]);
    setForm({
      title: "",
      content: "",
      isImportant: false,
      isPublic: true
    });
    setIsCreating(false);
  };

  const baseButton =
    "h-12 px-6 rounded-xl font-bold flex items-center gap-2 border transition";

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white space-y-8">

      {/* 상단 */}
      <div className="flex justify-between items-center border-b border-yellow-400/40 pb-4">
        <h1 className="text-2xl font-bold">공지 관리</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-bold rounded-full hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          공지 등록
        </button>
      </div>

      {/* 등록창 */}
      {isCreating && (
        <div
          ref={createRef}
          className="bg-zinc-900 border-2 border-yellow-400 rounded-2xl p-6 space-y-4"
        >
          <input
            placeholder="공지 제목"
            value={form.title}
            onChange={e =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full bg-zinc-800 p-4 rounded-xl text-lg"
          />

          <textarea
            rows={5}
            placeholder="공지 내용"
            value={form.content}
            onChange={e =>
              setForm({ ...form, content: e.target.value })
            }
            className="w-full bg-zinc-800 p-4 rounded-xl"
          />

          <div className="flex justify-between items-center">
            <div className="flex gap-4">

              <button
                onClick={() =>
                  setForm({ ...form, isImportant: !form.isImportant })
                }
                className={`${baseButton} ${
                  form.isImportant
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "bg-zinc-800 text-yellow-400 border-yellow-400"
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                긴급
              </button>

              <button
                onClick={() =>
                  setForm({ ...form, isPublic: !form.isPublic })
                }
                className={`${baseButton} ${
                  form.isPublic
                    ? "bg-green-500 text-black border-green-500"
                    : "bg-red-500 text-white border-red-500"
                }`}
              >
                {form.isPublic ? (
                  <>
                    <Eye className="w-4 h-4" />
                    공개
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4" />
                    비공개
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleCreate}
              className="h-12 px-10 bg-yellow-400 text-black font-extrabold rounded-xl"
            >
              <Save className="w-4 h-4 inline mr-2" />
              등록
            </button>
          </div>
        </div>
      )}

      {/* 리스트 */}
      <div className="space-y-4">
        {notices.map(notice => {
          const isOpen = openId === notice.id;

          return (
            <div
              key={notice.id}
              className="border-l-4 border-yellow-400 bg-zinc-900 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => {
                  if (isOpen) {
                    setOpenId(null);
                    setEditNotice(null);
                  } else {
                    setOpenId(notice.id);
                    setEditNotice({ ...notice });
                  }
                }}
                className="w-full px-6 py-6 flex justify-between items-center"
              >
                <div className="w-52 shrink-0 text-sm text-zinc-400">
                  {notice.date} {notice.time}
                </div>

                <div className="flex-1 text-left px-4">
                  <div className="text-2xl font-extrabold">
                    {notice.title}
                  </div>
                </div>

                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isOpen ? "rotate-180 text-yellow-400" : ""
                  }`}
                />
              </button>

              {isOpen && editNotice && (
                <div className="px-6 pb-6 space-y-6 border-t border-yellow-400/30">

                  <input
                    value={editNotice.title}
                    onChange={e =>
                      setEditNotice({ ...editNotice, title: e.target.value })
                    }
                    className="w-full bg-zinc-800 p-4 rounded-xl text-lg font-bold"
                  />

                  <textarea
                    value={editNotice.content}
                    onChange={e =>
                      setEditNotice({ ...editNotice, content: e.target.value })
                    }
                    rows={4}
                    className="w-full bg-zinc-800 p-4 rounded-xl"
                  />

                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">

                      <button
                        onClick={() =>
                          setEditNotice({
                            ...editNotice,
                            isImportant: !editNotice.isImportant
                          })
                        }
                        className={`${baseButton} ${
                          editNotice.isImportant
                            ? "bg-yellow-400 text-black border-yellow-400"
                            : "bg-zinc-800 text-yellow-400 border-yellow-400"
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4" />
                        긴급
                      </button>

                      <button
                        onClick={() =>
                          setEditNotice({
                            ...editNotice,
                            isPublic: !editNotice.isPublic
                          })
                        }
                        className={`${baseButton} ${
                          editNotice.isPublic
                            ? "bg-green-500 text-black border-green-500"
                            : "bg-red-500 text-white border-red-500"
                        }`}
                      >
                        {editNotice.isPublic ? (
                          <>
                            <Eye className="w-4 h-4" />
                            공개
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4" />
                            비공개
                          </>
                        )}
                      </button>

                      {/* 삭제 버튼 */}
                      <button
                        onClick={() => {
                          setNotices(prev =>
                            prev.filter(n => n.id !== notice.id)
                          );
                          setOpenId(null);
                          setEditNotice(null);
                        }}
                        className="h-12 px-6 rounded-xl font-bold flex items-center gap-2 border bg-red-600 text-white border-red-600 hover:opacity-90"
                      >
                        <Trash2 className="w-4 h-4" />
                        삭제
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setNotices(prev =>
                          prev.map(n =>
                            n.id === editNotice.id ? editNotice : n
                          )
                        );
                        setOpenId(null);
                        setEditNotice(null);
                      }}
                      className="h-12 px-10 bg-yellow-400 text-black font-extrabold rounded-xl"
                    >
                      수정 저장
                    </button>
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

export default AdminNoticePage;
