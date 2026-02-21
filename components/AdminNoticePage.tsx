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

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc  
} from "firebase/firestore";

import { db } from "../src/firebase";

type Notice = {
  id: string;
  title: string;
  content: string;
  isImportant: boolean;
  isPublic: boolean;
  date: string;
  time: string;
};

type ToggleProps = {
  value: boolean;
  onChange: () => void;
  activeColor: string;
  labelOn: string;
  labelOff: string;
};

const Toggle = ({
  value,
  onChange,
  activeColor,
  labelOn,
  labelOff
}: ToggleProps) => {
  return (
    <button
      onClick={onChange}
      className="flex items-center gap-3"
    >
      <span
        className={`text-sm font-semibold ${
          value ? "text-white" : "text-zinc-400"
        }`}
      >
        {value ? labelOn : labelOff}
      </span>

      <div
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
          value ? activeColor : "bg-zinc-700"
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
            value ? "translate-x-6" : ""
          }`}
        />
      </div>
    </button>
  );
};


const AdminNoticePage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [editNotice, setEditNotice] = useState<Notice | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const createRef = useRef<HTMLDivElement>(null);
const createTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    isImportant: false,
    isPublic: true
  });

  useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }
}, [editNotice]);

  useEffect(() => {
  const fetchNotices = async () => {
    try {
      const q = query(
        collection(db, "notices"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const loaded: Notice[] = snapshot.docs.map(doc => {
        const data = doc.data();

        const createdAt = data.createdAt?.toDate?.() ?? new Date();

        return {
          id: doc.id, // 🔥 doc.id 사용
          title: data.title ?? "",
          content: data.content ?? "",
          isImportant: data.isPinned ?? false,
          isPublic: data.isVisible ?? true,
          date: createdAt.toISOString().slice(0, 10),
          time: createdAt.toTimeString().slice(0, 5)
        };
      });

      setNotices(loaded);
    } catch (error) {
      console.error("공지 불러오기 실패:", error);
    }
  };

  fetchNotices();
}, []);

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

const docRef = await addDoc(collection(db, "notices"), {
  title: form.title,
  content: form.content,
  createdAt: serverTimestamp(),
  isPinned: form.isImportant,
  isVisible: form.isPublic
});

const newNotice: Notice = {
  id: docRef.id,
      ...form,
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 5)
    };

    try {

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
        <h1 className="text-2xl font-bold">운영자 공지 관리</h1>
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
  ref={createTextareaRef}
  placeholder="공지 내용"
  value={form.content}
  onChange={e => {
    const value = e.target.value;
    setForm({ ...form, content: value });

    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }}
  className="w-full bg-zinc-800 p-5 rounded-xl resize-none overflow-hidden"
/>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-3">

<Toggle
  value={form.isImportant}
  onChange={() =>
    setForm({ ...form, isImportant: !form.isImportant })
  }
  activeColor="bg-yellow-400"
  labelOn="🔥 긴급 공지"
  labelOff="일반 공지"
/>

<Toggle
  value={form.isPublic}
  onChange={() =>
    setForm({ ...form, isPublic: !form.isPublic })
  }
  activeColor="bg-yellow-400"
  labelOn="👁 공개"
  labelOff="🔒 비공개"
/>
            </div>

            <button
              onClick={handleCreate}
              className="w-full md:w-auto py-3 md:h-12 px-6 md:px-10 bg-yellow-400 text-black font-extrabold rounded-xl"
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
                className="w-full px-4 md:px-6 py-5 md:py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0"
              >
                <div className="text-xs md:text-sm text-zinc-400 md:w-52 shrink-0">
                  {notice.date} {notice.time}
                </div>

<div className="w-full md:flex-1 text-left md:px-4 flex flex-wrap items-center gap-2">

 <div className="text-lg font-semibold">
    {notice.title}
  </div>

  {/* 긴급 배지 */}
  {notice.isImportant && (
    <span className="text-xs px-3 py-1 rounded-full bg-yellow-400 text-black font-bold">
      긴급
    </span>
  )}

  {/* 공개 / 비공개 배지 */}
  <span
    className={`text-xs px-3 py-1 rounded-full font-semibold ${
      notice.isPublic
        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/40"
        : "bg-zinc-700 text-zinc-400"
    }`}
  >
    {notice.isPublic ? "공개" : "비공개"}
  </span>

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
  ref={textareaRef}
  value={editNotice.content}
  onChange={e => {
    const value = e.target.value;
    setEditNotice({ ...editNotice, content: value });

    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }}
  className="w-full bg-zinc-800 p-5 rounded-xl resize-none overflow-hidden"
/>

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex flex-wrap gap-3">

<Toggle
  value={editNotice.isImportant}
  onChange={() =>
    setEditNotice({
      ...editNotice,
      isImportant: !editNotice.isImportant
    })
  }
  activeColor="bg-yellow-400"
  labelOn="🔥 긴급 공지"
  labelOff="일반 공지"
/>

<Toggle
  value={editNotice.isPublic}
  onChange={() =>
    setEditNotice({
      ...editNotice,
      isPublic: !editNotice.isPublic
    })
  }
  activeColor="bg-yellow-400"
  labelOn="👁 공개"
  labelOff="🔒 비공개"
/>

                      {/* 삭제 버튼 */}
                      <button
onClick={async () => {
  if (!confirm("정말 삭제하시겠습니까?")) return;

  try {
    await deleteDoc(doc(db, "notices", notice.id));
    setNotices(prev =>
      prev.filter(n => n.id !== notice.id)
    );
    setOpenId(null);
    setEditNotice(null);
  } catch (error) {
    console.error("공지 삭제 실패:", error);
  }
}}
                      className="w-full md:w-auto py-2 md:h-8 px-4 text-sm rounded-lg font-semibold flex items-center justify-center gap-2 bg-red-600 text-white hover:opacity-90"
                      >
                        <Trash2 className="w-4 h-4" />
                        삭제
                      </button>
                    </div>
<button
  onClick={async () => {
    if (!editNotice) return;

    try {
      await updateDoc(doc(db, "notices", editNotice.id), {
        title: editNotice.title,
        content: editNotice.content,
        isPinned: editNotice.isImportant,
        isVisible: editNotice.isPublic
      });

      setNotices(prev =>
        prev.map(n =>
          n.id === editNotice.id ? editNotice : n
        )
      );

      setOpenId(null);
      setEditNotice(null);

    } catch (error) {
      console.error("공지 수정 실패:", error);
    }
  }}
  className="w-full md:w-auto py-3 md:h-12 px-6 md:px-10 bg-yellow-400 text-black font-extrabold rounded-xl"
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
