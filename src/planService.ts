import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

// 요금제 설정
export async function setUserPlan(uid: string, plan: string) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { plan });
}

// 사용횟수 1 증가
export async function incrementUserUsage(uid: string) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    totalUsage: increment(1),
  });
}
