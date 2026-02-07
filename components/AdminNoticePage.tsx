import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase"; // 경로 맞게

const AdminNoticePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submitNotice = async () => {
    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    await addDoc(collection(db, "notices"), {
      title,
      content,
      isImportant: true,
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setContent("");
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white space-y-4">
      <h1 className="text-2xl font-bold">공지 등록 (관리자)</h1>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="공지 제목"
        className="w-full p-3 rounded bg-zinc-800"
      />

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="공지 내용"
        rows={8}
        className="w-full p-3 rounded bg-zinc-800"
      />

      <button
        onClick={submitNotice}
        disabled={loading}
        className="px-6 py-2 bg-yellow-400 text-black font-bold rounded"
      >
        {loading ? "등록 중..." : "공지 등록"}
      </button>
    </div>
  );
};

export default AdminNoticePage;
